import { Injector, Optional, SkipSelf } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { enc } from 'crypto-js';
import { ExtCookieService } from './services/cookies.service';
import { HttpClientService } from './services/httpclient.service';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

export class BaseService {

	protected httpService: HttpClientService;
	
	protected injector: Injector;

	protected isTest: boolean = false;

	protected isHashMode = true;

	protected clientId:string;

	protected apiContextPath:string;
	
	constructor(injector: Injector) {
		
		let http = injector.get(HttpClient);
		this.httpService = new HttpClientService(http);

		//this.httpClientService.setClientId(this.appConfig.app.clientId);
		//this.jsonp = injector.get(Jsonp);
		//this.isTest  = !environment.production;
		//this.clientId = environment['clientId'];
	}

	get production(){
		return !this.isTest;
	}
	set production(val:boolean){
		this.isTest = !val;
	}
	
	public getLoginId():Object {
		let loginId = ExtCookieService.load(this.clientId + "-loginId");		
		return loginId;
	}

	public getLoginUser():Object {
		let userInfo:any = {};
		userInfo["username"] = ExtCookieService.load(this.clientId + "-username");
		userInfo["avatar"] = ExtCookieService.load(this.clientId + "-avatar");
		userInfo["userToken"] = ExtCookieService.load(this.clientId + "-userToken");
		userInfo["loginId"] = ExtCookieService.load(this.clientId + "-loginId");		
		return userInfo;
	}

	public base64Encode(input: string) {
		if (input == null) {
			return null;
		}
		return enc.Base64.stringify(enc.Utf8.parse(input));
	}
	
	public base64Decode(input: string) {
		if (input == null) {
			return null;
		}
		return enc.Utf8.stringify(enc.Base64.parse(input));
	}

	parseUrlParams(queryString: string) {
		//debugger;
		let segments = queryString.split("&");
		let resultObj:any = {};
		if (segments != null) {
			for (let i = 0; i < segments.length; i++) {
				let values = segments[i].split("=");
				resultObj[values[0]] = values[1];
			}
		}
		return resultObj;
	}

	// ******************************
	// 获取URL中的参数
	// ******************************  
	getUrlParam(paramName: string) {
		let requestUrl = window.location.href;
		let pos = requestUrl.indexOf("?");
		let reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
		let r = requestUrl.substr(pos).match(reg); // 匹配目标参数
		if (r != null)
			return decodeURIComponent(r[2]);

		reg = new RegExp("(^|/\?)" + paramName + "=([^&]*)(&|$)"); // 构造一个含有目标参数的正则表达式对象
		r = requestUrl.substr(pos).match(reg); // 匹配目标参数
		if (r != null)
			return decodeURIComponent(r[2]);

		return null; // 返回参数值
	}

	// ******************************
	// 获取当前contextPath
	// *******************************
	findContextPath() {
		let path = null;
		//debugger;
		//var path = CookieService.load('contextPath');
		if (path == null) {
			// var links = document.links;
			// for(let i = 0; i < links.length;i++){
			//   var href = links[i]["href"];
			//   console.log(href);
			// }  
			var scripts = document.scripts;
			for (let i = 0; i < scripts.length; i++) {
				var src = scripts[i]["src"];
				//console.log(src);
				var lastIndex = src.indexOf('vendor.');
				if (lastIndex != -1) {
					path = src.substring(0, lastIndex);
				}
			}
		}
		if (this.isHashMode) {
			path = path + "#";
		}
		// console.log("the web context is " + path);
		return path;
	}

	ajaxDelete(ajaxUrl: string): Observable<Object> {
		return this.httpService.ajaxDelete(ajaxUrl);
	}

	ajaxPut(ajaxUrl: string, params: any): Observable<Object> {
		return this.httpService.ajaxPut(ajaxUrl, params);
	}

	ajaxPost(ajaxUrl: string, params: any): Observable<Object> {
		return this.httpService.ajaxPost(ajaxUrl, params);
	}

	ajaxGet(ajaxUrl: string, params: any): Observable<Object> {		
		return this.httpService.ajaxGet(ajaxUrl, params);
	}
	
	ajaxLoad(ajaxUrl: string): Observable<Object> {
		return this.httpService.ajaxLoad(ajaxUrl);
	}

	getJSON(dataUrl: string, options?: Object): Observable<Object> {
		//debugger;
		return this.httpService.get(dataUrl, options)
			.do(response => response as Object)
			.catch(error => this.httpService.handleError(dataUrl,error));
	}

	getDataByProxy(dataUrl: string): Observable<Object> {
		//debugger;
		//获取JSON数据
		let requestUrl = "/api/data/http_proxy"
		let url = this.formatUrl(requestUrl);
		let options = {
			params: {
				"http_proxy_url": dataUrl
			}
		};

		return this.httpService.post(url, options)
			.do(response => response as Object)
			.catch(error => this.httpService.handleError(url,error));
	}

	bulidSearchString(action: string, params: any) {
		let searchString: URLSearchParams = new URLSearchParams();
		if (!this.isTest && (action == "query" || action == "search")) {
			searchString.set("command", "search");
		}

		//if (params != null) debugger;
		for (let k in params) {
			if (k == "command") {
				continue;
			}
			if (params[k] !== '') {
				searchString.set(k, params[k]);
			}
		}

		//console.log(JSON.stringify(params) + "-----" + JSON.stringify(searchString));
		return searchString;
	}

	formatUrl(ajaxUrl: string): string {
		return this.httpService.formatUrl(ajaxUrl);
	}

	/**
	 * 
	 * @param dataObject 
	 * @param field 
	 */
	getValue(dataObject: any, field: string) {
		//debugger;
		let elements = Object.keys(dataObject).sort();
		for (let i = 0; i < elements.length; i++) {
			if (field.toLowerCase() == elements[i].toLowerCase()) {
				return dataObject[elements[i]];
			}
		}
		return dataObject[field];
	}

	getKeys(item:any){
		return Object.keys(item).sort();
	}

	storeCookie(path:string, value:any){
		ExtCookieService.save(path, value);
	}

	loadCookie(path:string){
		return ExtCookieService.load(path);
	}
}

