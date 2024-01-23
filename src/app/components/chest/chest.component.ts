import {Component, OnInit} from '@angular/core';
import {ScreenService} from "../../services/screen.service";
import party from "party-js";
import {Apollo, gql} from "apollo-angular";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";

const rarityArray = [
  "common",
  "uncommon",
  "rare",
  "legendary"
];

const rarityTier = Math.floor(Math.random() * 100) + 1;

const activateChest = gql`
mutation MyMutation($id: Int!) {
  openChest(id: $id) {
    id
    image_url
    is_available_for_sale
  }
}
`;

const getRarity = gql`
query MyQuery($item_id: Int!, $chest_id: Int!) {
  get_rarity_chest(item_id: $item_id, chest_id: $chest_id) {
    rarity
  }
}
`;

@Component({
  selector: 'app-chest',
  templateUrl: './chest.component.html',
  styleUrls: ['./chest.component.scss']
})



export class ChestComponent implements OnInit{
  public chest:HTMLImageElement = null;
  public background:HTMLImageElement = null;
  public openedChest: boolean = false;
  public closeButton: boolean = false;
  public rarity: string = "";
  private querySubscription: Subscription;
  private chestId: number;
  private currentChestId: number;
  private chestData: any;
  private rarityObject: any;

  constructor(private screenService: ScreenService,
              private apollo: Apollo,
              private toast: ToastrService) {

  }


  ngOnInit(): void {
    this.chest = document.querySelector("#chest");
    this.background = document.querySelector("#background")

    this.screenService.addClass$.subscribe((e) => {
      this.openedChest = e;
    })

    this.screenService.currentChestId.subscribe(id => {
      this.chestId = id;
    });

    this.screenService.currentMainChestId.subscribe(id => {
      this.currentChestId = id;
    });
  }

  public openChest(e)
  {
    this.querySubscription = this.apollo
      .mutate({
        mutation: activateChest,
        variables: {
          id: Number(this.chestId),
        }
      })
      .subscribe({
        next: ({ data }) => {
          this.chestData = data;
          console.log(this.chestData);

          this.querySubscription = this.apollo
            .mutate({
              mutation: getRarity,
              variables: {
                chest_id: Number(this.currentChestId),
                item_id: Number(this.chestData.openChest.id)
              }
            })
            .subscribe((dataa: any) => {
              setTimeout(() => {
                this.rarity = dataa.data.get_rarity_chest.rarity;
              }, 2900)

              // next: ({ data }) => {
              //
              //   console.log(this.rarityObject)
              // },
              // error: (error) => {
              //   console.log(error)
              //   this.toast.success(error, "Succes", {
              //     positionClass: "toast-center-center",
              //     timeOut: 5000
              //   })
              // }
            });

        },
        error: (error) => {
          console.log(error)
          this.toast.success(error, "Succes", {
            positionClass: "toast-center-center",
            timeOut: 5000
          })
        }
      });

    this.closeButton = true;
    let index;

    if (rarityTier <= 50) {
      index = 0;
    } else if (rarityTier <= 85) {
      index = 1;
    } else if (rarityTier <= 95) {
      index = 2;
    } else {
      index = 3;
    }

    this.background.src = "assets/img/background-" + rarityArray[index] + ".png";


    this.chest.classList.add("open-chest")
    this.background.classList.add("rotate-bg")

    setTimeout(() => {
      this.chest.src = this.chestData.openChest.image_url;
      // window.localStorage.setItem("character", `character${randomCharacter}.png`);
      this.chest.classList.add("zoom")
      party.confetti(this.background, {
        count: party.variation.range(50, 100)
      })
    }, 3000)

    setTimeout(() => {
      window.location.reload();
    }, 5000)
  }

  public closeChest()
  {
    this.openedChest = false;
  }
}
