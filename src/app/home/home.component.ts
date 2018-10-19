import {Component, OnInit} from '@angular/core';
import {environment} from "../../environments/environment";
import {MatSnackBar} from "@angular/material";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    maxGTIDLength = 9;
    cardSwipeTimeMilliseconds = 500;
    messageDurationMilliseconds = 2000;

    version = environment.VERSION;
    isDarkTheme: boolean = false; // TODO: Add toggle

    appInitialized: boolean = false;
    digitKeypressBuffer = [];
    digitKeypressTimestampBuffer = [];

    className: string = null;

    constructor(public snackBar: MatSnackBar) {
    }

    ngOnInit() {
        const component = this;
        document.onkeypress = function (e) {
            const detectedDigit = e.keyCode - 48;
            if (detectedDigit >= 0 && detectedDigit <= 9) {
                component.digitKeypressBuffer.push(detectedDigit.toString());
                component.digitKeypressTimestampBuffer.push(Date.now());
                if (component.digitKeypressBuffer.length > component.maxGTIDLength) {
                    component.digitKeypressBuffer.shift();
                    component.digitKeypressTimestampBuffer.shift();
                }
                if (component.digitKeypressBuffer.length >= component.maxGTIDLength) {
                    component.checkForCardSwipe();
                }
            }
        };
    }

    checkForCardSwipe() {
        const component = this;
        if (component.appInitialized && Date.now() - component.digitKeypressTimestampBuffer[0] < component.cardSwipeTimeMilliseconds) {
            const inputGTID = component.digitKeypressBuffer.join('');
            console.log(inputGTID);
        }
    }

    initializeApp() {
        const component = this;
        component.showMessage('TODO: Read in CSV and start app');
    }

    showMessage(message: string) {
        const component = this;
        component.snackBar.open(message, null, {
            duration: component.messageDurationMilliseconds,
        });
    }
}
