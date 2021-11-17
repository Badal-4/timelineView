import { LightningElement, api, track } from 'lwc';
import getDataForBaseObject from '@salesforce/apex/TimelineViewController.getDataForBaseObject';
import {showToast} from 'c/accniteCommonHelper';


export default class TimelineView extends LightningElement {
    @api recordId;
    @track timelineData = {};
    @track futureData = [];
    @track pastData = [];
    @track noFuture = false;
    @track showFilterModal = false;
    @track filterfrom;
    @track filterto;
    @track completeData = {};
    @track childData = [];
    get isFuture(){
        return (this.futureData != null && this.futureData.length > 0);

    }

   get isPast(){
        return (this.pastData != null && this.pastData.length > 0);       
           
    }

    connectedCallback(){
       getDataForBaseObject({recordId: this.recordId, parentObjectName : null})
        .then(result => {
            if(result.isSuccess) {
                this.timelineData = JSON.parse(result.response);
                this.completeData = JSON.parse(result.response);
                this.childData = this.timelineData.lstChildRecordDetails;
                this.futureData = this.childData.filter(word => new Date(word.orderingDate) > new Date());
                this.pastData = this.childData.filter(word => new Date(word.orderingDate) < new Date());
                this.futureData.reverse();
            } else {
                    showToast('Error', 'error',result.response,this);
            }
            
        })
        .catch(error => {
            this.error = error;
            showToast('Error', 'error', this.error,this);
        })
    }

    openFilters(){
        this.showFilterModal = true;
    }

    hideModal(){
        this.showFilterModal = false;
    }

    applyFilter(){
        if(this.filterfrom != null && this.filterfrom != undefined && this.filterfrom != ''
            && this.filterto != null && this.filterto != undefined && this.filterto != ''){
            this.childData = this.completeData.lstChildRecordDetails
                .filter(data => ((new Date(data.orderingDate) >=  new Date(this.filterfrom)) && (new Date(data.orderingDate) <= new Date(this.filterto))));
        }else if(this.filterfrom != null && this.filterfrom != undefined && this.filterfrom != ''){
            this.childData = this.completeData.lstChildRecordDetails
                .filter(data => ((new Date(data.orderingDate) >=  new Date(this.filterfrom))));
        }else if(this.filterto != null && this.filterto != undefined && this.filterto != ''){
            this.childData = this.completeData.lstChildRecordDetails
                .filter(data => ((new Date(data.orderingDate) <=  new Date(this.filterto))));
        }else{
            this.childData = this.completeData.lstChildRecordDetails;
        }
        
        this.futureData = this.childData.filter(word => new Date(word.orderingDate) > new Date());
        this.pastData = this.childData.filter(word => new Date(word.orderingDate) < new Date());
        this.showFilterModal = false;
    }

    setFromValue(event){
        this.filterfrom = event.target.value;
    }

    setToValue(event){
        this.filterto = event.target.value;
    }

    setToValue(event){
        this.filterto = event.target.value;
    }

    doToggle(event){
        let targetId = event.target.dataset.id;
        var acc = this.template.querySelector(`[data-id="${targetId}"]`);
        let classList = acc.className.split(' ');
        var panel = this.template.querySelector(`[data-target-id="${targetId}"]`);
        
        if (panel.style.maxHeight) {
        
        panel.style.maxHeight = null;
        } 
        else {
        panel.style.maxHeight = "100%";
        }
        if(classList.indexOf('active') == -1){
            classList.push('active');
            acc.className = classList.join(' ');
        }
        else{
            classList.splice(classList.indexOf('active'),1);
            acc.className = classList.join(' ');
        } 
    }

}
