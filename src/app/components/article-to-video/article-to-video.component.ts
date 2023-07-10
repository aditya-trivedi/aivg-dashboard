import { Component, ViewChild } from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import { AivideoService } from 'src/app/services/aivideo.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { normalVoiceSampleAvailableLanguages, paidVoiceSampleAvailableLanguages } from 'src/shared/utils';


@Component({
  selector: 'app-article-to-video',
  templateUrl: './article-to-video.component.html',
  styleUrls: ['./article-to-video.component.css']
})
export class ArticleToVideoComponent {

    isImageGeneratedOnce = false;
    normalVoiceSampleAvailableLanguages = normalVoiceSampleAvailableLanguages;
    paidVoiceSampleAvailableLanguages = paidVoiceSampleAvailableLanguages;
    currentNormalVoiceSample = { 
      audioLink : ''
    };

    currentPaidVoiceSample = {
      audioLink : '' 
    };

    articleTextFormGroup = this._formBuilder.group({
      articleText: ['', [Validators.required,Validators.maxLength(1000)]],
    });

    constructor( private _formBuilder: FormBuilder,
        private Aivideoservice: AivideoService
    ){}

    imagePreviews: Array<any> = [  ];
    uploadedImagePreviews: Array<any> = [];
    generatedImagePreviews: Array<any> =  [];
    selectedImages = [];
    imageStepValidityForm = new FormControl('')

    sampleAudioFilePolly: string = '';
    sampleAudioFileElevenLabs: string = '';
    uploadedAudioFileSrc: any;

    selectImages(event: any): void {
      this.selectedImages = event.target.files;
  
      if (this.selectedImages && this.selectedImages[0]) {
        if(this.selectedImages.length + this.uploadedImagePreviews.length > 10){
          return;
        }
        const numberOfFiles = this.selectedImages.length;
        for (let i = 0; i < numberOfFiles; i++) {
          const reader = new FileReader();
  
          reader.onload = (e: any) => {
            this.uploadedImagePreviews.push(e.target.result);
          };
  
          reader.readAsDataURL(this.selectedImages[i]);
        }
        this.selectedImages = [];
      }
    }

    generateImagesRelatedToArticle(){
      this.isImageGeneratedOnce = true;
      let data = 'rahul gandhi'
      this.Aivideoservice.generateImageBasedOnText({ story : data}).subscribe(
        response => {
          console.log(response)
        }
      )
    }

    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } else if ( event.container.id == "cdk-drop-list-2" &&  this.imagePreviews.length === 10){
          return;
      } else {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
      if( this.imagePreviews.length <= 10  && this.imagePreviews.length > 0){
        this.imageStepValidityForm.reset();
      } else {
        this.imageStepValidityForm.setErrors( { "required" : true } )
      }
    }

    onAudioUpload(event: any){        
      console.log('aya')
      if (event.target.files && event.target.files[0]) {
        const selectedAudio = event.target.files[0];
  
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedAudioFileSrc = e.target.result;
        };
  
        reader.readAsDataURL(selectedAudio);
      }
    }

    onNormalVoiceSampleChange(event: any){
      let indexOfAudio = normalVoiceSampleAvailableLanguages.findIndex( lang => lang.value === event.value )
      this.currentNormalVoiceSample = normalVoiceSampleAvailableLanguages[indexOfAudio];
    }

    onPaidVoiceSampleChange(event: any){
      let indexOfAudio = paidVoiceSampleAvailableLanguages.findIndex( lang => lang.value === event.value )
      this.currentPaidVoiceSample = paidVoiceSampleAvailableLanguages[indexOfAudio];
    }
}
