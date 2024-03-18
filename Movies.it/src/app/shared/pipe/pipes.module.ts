import { ToIntPipe } from "./to-int.pipe";
import { SortByRatingPipe } from "./sort-by-rating.pipe";
import { NgModule } from "@angular/core";

@NgModule({
    imports: [],
    declarations: [ToIntPipe, SortByRatingPipe],
    exports: [ToIntPipe, SortByRatingPipe]
})
export class PipesModule {}