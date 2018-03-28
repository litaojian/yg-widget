import { Component, ViewContainerRef, ChangeDetectorRef, ComponentRef, SimpleChanges, ViewChild, OnInit, Input, HostBinding, AfterViewInit, Injector, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema } from '../biz-form';
import { SimpleTableColumn, SimpleTableButton, SimpleTableFilter, SimpleTableComponent } from '../biz-table';
import { BizTreeService } from './biz-tree.service';
import { BizDialogComponent } from './biz-dialog.component';
import { ZxTreeComponent } from '../my-tree';

@Component({
    selector: 'bizdialog-tree',
    template: `
    <div nz-row [nzGutter]="24">
        <div nz-col [nzXl]="navTree.nzXl" [nzLg]="navTree.nzLg" [nzMd]="navTree.nzMd" [nzSm]="navTree.nzSm" [nzXs]="navTree.nzXs">
            <zx-tree #myNavTree tree-id="nTree1" (nodeClick)="onTreeNodeClick($event)" [has-checkbox]="navTree.checkbox" key-title="name" key-id="nodeId" key-pid="parentId" class="tree"></zx-tree>
        </div>
    </div>
    `,
    providers: [BizTreeService]
})
export class BizDialogTreeComponent extends BizDialogComponent {

    @ViewChild('myNavTree')
    myNavTree: ZxTreeComponent;

    constructor(injector: Injector) {
        super(injector);
        //
        this.bizService = injector.get(BizTreeService);
        //
        console.log("BizDialogTreeComponent init .......");
    }

    @Input()
    set pageUrl(url: string) {
      //debugger;
      this.bizService.pageUrl = url;
    }


    get navTree(){
        return (<BizTreeService>this.bizService).navTree;
    }

    onPageInit(resultData: any, url:string) {
        //初始化配置数据
        this.bizService.onPageInit(resultData, url, this.actions);

        // 重新载入树的节点数据
        this.myNavTree.loadTree(this.navTree);
    }    

}
