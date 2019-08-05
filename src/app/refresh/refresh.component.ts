import { Component, OnInit, Output, Input, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Subscription, Observable, timer } from 'rxjs';
import * as moment from 'moment';

@Component({
	selector: 'app-refresh',
	templateUrl: './refresh.component.html',
	styleUrls: ['./refresh.component.css']
})
export class RefreshComponent  {
	

	onClick($event) {
		console.log('Click!', event)
		
			window.location.reload();
		
	}
}