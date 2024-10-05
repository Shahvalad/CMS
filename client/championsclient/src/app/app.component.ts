import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Champion } from './champion';
import { ChampionsService } from './champions.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HttpClientModule, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title = 'championsclient';
  public champions: Champion[]
  public filteredChampions: Champion[] = [];
  public existingChampion: Champion;
  public existingChampionId: number;
  public searchTerm: string = '';

  constructor(private championsService: ChampionsService){
    this.champions = [],
    this.existingChampion = {} as Champion
    this.existingChampionId=0;
  }

  ngOnInit() {
      this.getChampions();
  }

  public getChampions(): void {
    this.championsService.getChampions().subscribe({
      next: (response: Champion[]) => {
        this.champions = response;
        this.filteredChampions = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public getFilteredChampions(): Champion[] {
    return this.filteredChampions = this.champions.filter(champion =>
      champion.name.toLowerCase().includes(this.searchTerm.toLowerCase())
  );
}

  public onAddChampion(addForm : NgForm) : void{
    this.championsService.addChampion(addForm.value).subscribe(
      (response: Champion) => {
        console.log(response);
        this.getChampions();
        addForm.reset();
      },
      (error : HttpErrorResponse) => {
        alert(error.message)
      }
    )
    document.getElementById('add-champion-close-button')?.click();
  }

  public onEditChampion(id: number | null, champion: Champion): void {
    if (id === null) {
        console.error('Champion ID is null, cannot edit champion');
        return; 
    }
    this.championsService.editChampion(id, champion).subscribe(
        (response: Champion) => {
            this.getChampions();
            console.log(response);
        },
        (error: HttpErrorResponse) => {
            console.log(error.message);
        }
    );
}

public onDeleteChampion(id: number): void {
  this.championsService.deleteChampion(id).subscribe({
    next: () => {
      document.getElementById('delete-close-button')?.click();
      this.getChampions();
      console.log(`Champion with id ${id} deleted successfully.`);
    },
    error: (error: HttpErrorResponse) => {
      console.error(`Error deleting champion: ${error.message}`);
    }
  });
}

  public onOpenModal(champion : Champion | null, mode : String) : void {
    const container = document.getElementById('my-nav');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-bs-toggle','modal');

    if(mode === 'add'){
      button.setAttribute('data-bs-target', '#addChampionModal');
    }
    else if (mode === 'edit') {
      if (champion) {
          this.existingChampion = champion; // Ensure this is defined
          this.existingChampionId = champion.id; // Ensure ID is set properly
      } else {
          console.error('Champion is null while opening edit modal');
      }
      button.setAttribute('data-bs-target', '#editChampionModal');
  }
    else if(mode === 'delete'){
      this.existingChampionId=champion!.id;
      button.setAttribute('data-bs-target','#deleteChampionModal');
    }
    container?.appendChild(button);
    button.click();
    container?.removeChild(button);
  }



}



