import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { BlockchainService } from 'src/app/module/service/blockchain.service';

@Component({
  selector: 'app-historial-blockchain',
  templateUrl: './historial-blockchain.component.html',
  styleUrls: ['./historial-blockchain.component.css']
})
export class HistorialBlockchainComponent implements OnInit {
  blockchain:any;

  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.getBlockchain()
  }

  getBlockchain(){
    this.blockchainService
      .getBlockchain(this.blockchainService.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.blockchain = data;
        console.log(data)
      });
  }
}
