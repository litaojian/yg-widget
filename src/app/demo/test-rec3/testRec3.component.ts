import { Component } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { SFSchema } from '../../../../lib/biz-widget';

@Component({
    selector: 'app-example-testrec',
    templateUrl: './testRec3.component.html'
})
export class TestRec3ListComponent {
    actions = {
        send: (form: any) => {
            this.msg.success(JSON.stringify(form.value));
        },
        reset: (form: any) => {
            form.reset({});
        }
    };

    // login
    DATA: any = {
        horizontal: {
            code: '' + require('!!raw-loader!../../schema/login-schema.json'),
            value: {},
            model: { email: 'litaojian@qq.com' }
        },
        vertical: {
            code: '' + require('!!raw-loader!../../schema/login-schema.json'),
            value: {},
            model: { email: 'litaojian@qq.com' }
        },
        inline: {
            code: '' + require('!!raw-loader!../../schema/login-schema.json'),
            value: {},
            model: { email: 'litaojian@qq.com' }
        }
    };

    constructor(private msg: NzMessageService) {
        Object.keys(this.DATA).forEach(key => {
            this.DATA[key]['schema'] = JSON.parse(this.DATA[key]['code']);
        });
    }
}
