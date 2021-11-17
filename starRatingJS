import { LightningElement,api,track } from 'lwc';
import starResource from '@salesforce/resourceUrl/NewFontAwesome';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class StarRating extends LightningElement {

    @api ratingValue;
    
    renderedCallback(){

        Promise.all([
            loadStyle(this, starResource + '/css/font-awesome.min.css')
        ])
            .then(() => {
                console.log('Files loaded.');
            })
            .catch(error => {
                console.log(JSON.stringify(error));
            });

        var ratingMap={'one':'1','two':'2','three':'3','four':'4','five':'5'}
        let targetId = this.ratingValue;
        let integerVal = ratingMap[this.ratingValue];
        for(var i=1;i<parseInt(integerVal)+1;i++){
            console.log('value check --> '+'[data-record="'+i+'"]');
            var panel = this.template.querySelector('[data-record="'+i+'"]');
            panel.classList.remove('unchecked');
            panel.classList.add('checked');
        }
        
    }
    
}
