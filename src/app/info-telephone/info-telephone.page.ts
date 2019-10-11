import { Component, OnInit } from '@angular/core';
import { Plugins, DeviceInfo, NetworkStatus } from '@capacitor/core';
const { Device,Network } = Plugins;

@Component({
  selector: 'app-info-telephone',
  templateUrl: './info-telephone.page.html',
  styleUrls: ['./info-telephone.page.scss'],
})
export class InfoTelephonePage implements OnInit {

info:DeviceInfo;
status:NetworkStatus;

  constructor() { }

  async ngOnInit() {
    

this.info =await Device.getInfo();
this.status = await Network.getStatus();
//console.log(info);
  }

}
