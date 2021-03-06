import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule }   from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule,ReactiveFormsModule}    from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';

import { MyTreeModule } from '../my-tree';
import { MySelectComponent }  from './components/myselect.component';
import { MyUploaderComponent }  from './components/myuploader.component';
import { MyLookupComponent }  from './components/mylookup.component';
import { MyInputComponent }  from './components/myinput.component';
import { MyLabelComponent }  from './components/mylabel.component';
import { MyTableComponent }  from './components/mytable.component';

import { ValuelistDirective }  from './directives/valuelist.directive';
import { ZxFormInputDirective }  from './directives/zx.forminput.directive';

import { MenuTreeService } from './services/menutree.service';

import { _HttpClient, ModalHelper } from '@delon/theme';
import { AlainThemeOptions, ALAIN_THEME_OPTIONS } from '@delon/theme';

const COMPONENTS = [
	MyTableComponent,
	MyUploaderComponent,
	MySelectComponent,
	MyLabelComponent,
	MyLookupComponent,
	MyUploaderComponent,
	MyInputComponent
];
const DIRECTIVES = [		
	ZxFormInputDirective,
	ValuelistDirective
];

const SERVICES = [		
	_HttpClient,
	MenuTreeService,
	ModalHelper
];


@NgModule({
  imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule,
		HttpClientModule,
		NgZorroAntdModule,
		MyTreeModule
  ],
  exports:[		
		HttpClientModule,
		MyTreeModule,
		...COMPONENTS,
		...DIRECTIVES		
  ],
  declarations: [
		...COMPONENTS,
		...DIRECTIVES	
	],
  entryComponents:[

  ]
})
export class MyAppModule {
  static forRoot(options?: Object): ModuleWithProviders {
	return {
		ngModule: MyAppModule,
		providers: [
			...SERVICES,
			{ provide: ALAIN_THEME_OPTIONS, useValue: {} }
		]
	};
  }  
}
