(this.webpackJsonpweb_console=this.webpackJsonpweb_console||[]).push([[0],{290:function(e,t,n){e.exports=n(410)},295:function(e,t,n){},296:function(e,t,n){},298:function(e,t,n){},348:function(e,t,n){},386:function(e,t){},389:function(e,t){},392:function(e,t,n){},393:function(e,t,n){},394:function(e,t,n){},395:function(e,t,n){},410:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(6),o=n.n(i),c=(n(295),n(296),n(297),n(298),n(7)),s=n(8),u=n(21),l=n(19),h=n(18),f=n(10),p=n.n(f),m=n(23),d=n(45),v=Object(s.a)((function e(){Object(c.a)(this,e)}));v.GET="get",v.POST="post",v.PUT="put",v.DELETE="delete";var b={name:"access-token"};Object(s.a)((function e(){Object(c.a)(this,e)})).firstName="firstName";var g=Object(s.a)((function e(){Object(c.a)(this,e)}));g.USER_NAME="userName",g.USER_ID="userId",g.ADMIN_TOKEN="admin_token",g.LOGIN_TOKEN="access-token";var O=n(122);function E(){var e=localStorage.getItem(g.LOGIN_TOKEN);if(""===e||null==e)return{};var t=JSON.parse(e);return{token:null===t||void 0===t?void 0:t.token,userName:null===t||void 0===t?void 0:t.params[g.USER_NAME]}}function j(){return y.apply(this,arguments)}function y(){return(y=Object(m.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new S,e.next=3,t.post("userLogout",{});case 3:200===e.sent.status&&localStorage.removeItem(g.LOGIN_TOKEN);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var k=Object(s.a)((function e(t,n){Object(c.a)(this,e),this.status=t,this.content=n})),N=function(){function e(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};Object(c.a)(this,e),this.url=t,this.url||(this.url="/run"),this.fetch_config=n}return Object(s.a)(e,[{key:"request",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n){var a,r,i,o,c,s,u,l,h,f,m,v,O,j,y=arguments;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:for(s in a=(a=y.length>2&&void 0!==y[2]?y[2]:"GET").toUpperCase(),r=E(),i=r.token,(o=r.userName)&&(n[g.USER_NAME]=o),i&&(n[g.LOGIN_TOKEN]=i),c=[],n)u=encodeURIComponent(s),l=encodeURIComponent(n[s]),c.push(u+"="+l);return h=this.url+"?action="+t,"GET"===a?(h=h+"&"+c.join("&"),c=void 0):c=c.join("&"),f={method:a,timeout:864e5,headers:{"Content-Type":"application/x-www-form-urlencoded",Accept:"application/json","Access-Token":sessionStorage.getItem(b)||""},body:c},m=Object(d.a)(Object(d.a)({},f),this.fetch_config),e.prev=11,e.next=14,fetch(h,m);case 14:if((v=e.sent).ok){e.next=20;break}return e.next=18,v.text();case 18:return O=e.sent,e.abrupt("return",new k(v.status,O));case 20:return e.next=22,v.json();case 22:return j=e.sent,e.abrupt("return",new k(200,j));case 26:return e.prev=26,e.t0=e.catch(11),e.abrupt("return",new k(500,e.t0));case 29:case"end":return e.stop()}}),e,this,[[11,26]])})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),w=Object(s.a)((function e(){Object(c.a)(this,e)}));w.HELLO="hello_world",w.LIST_SCRIPT_FILE="listScriptFile",w.CREATE_SCRIPT_FILE="createScriptFile",w.LIST_ACTIONS="listActions",w.LIST_APINavItems="listAPINavItems",w.LIST_APINav="listAPINav",w.ChooseAPINav="chooseAPINav",Object(s.a)((function e(){Object(c.a)(this,e)})).USERE_NAME="userName",Object(s.a)((function e(){Object(c.a)(this,e)})).SIGH_IN_MAIN_PAGE="sighInMainPage";var S=function(){function e(){Object(c.a)(this,e),this.backend=new N}return Object(s.a)(e,[{key:"hello",value:function(){var e=Object(m.a)(p.a.mark((function e(){var t;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.backend.request(w.HELLO,{},v.GET);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"get",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.backend.request(t,n,v.GET);case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"post",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n){var a;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.backend.request(t,n,v.POST);case 2:return a=e.sent,e.abrupt("return",a);case 4:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()}]),e}(),C=n(473),I=n(502),x=n(412),P=n(475),T=n(206),_=n.n(T),A=n(154),L=n(474),D=n(501),R=n(472),M=n(470),G=n(471),B=n(469),F=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).warn=function(e,t){a.setState({open:!0,title:e,content:t})},a.handleClose=function(){a.setState({open:!1})},a.state={open:!1},a}return Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(D.a,{open:this.state.open,onClose:this.handleClose,"aria-labelledby":"alert-dialog-title","aria-describedby":"alert-dialog-description"},r.a.createElement(B.a,{id:"alert-dialog-title"},this.state.title),r.a.createElement(M.a,null,r.a.createElement(G.a,{id:"alert-dialog-description"},this.state.content)),r.a.createElement(R.a,null,r.a.createElement(x.a,{onClick:this.handleClose,color:"primary"},"Close"))))}}]),n}(r.a.Component),U=n(476),V=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(){return Object(c.a)(this,n),t.apply(this,arguments)}return Object(s.a)(n,[{key:"setStateSync",value:function(e){var t=this;return new Promise((function(n){t.setState(e,n)}))}}]),n}(r.a.Component),W=n(496),q=n(495),z=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).addItem=function(e,t){var n=r.a.createElement(q.a,{variant:"outlined",margin:"normal",fullWidth:!0,autoFocus:!0,onChange:function(t){a.form.forms[e]=t.target.value},name:e,label:e}),i=a.state.elements.concat(n);a.setState({elements:[i],popupVisible:!1})},a.handleOk=function(){a.addItem(a.inputName,"")},a.handleCancel=function(){a.setState({popupVisible:!1})},a.popup=function(){a.setState({popupVisible:!0})},a.newFieldName=function(e){a.inputName=e.target.value},a.form=e.form,a.state={elements:[],popupVisible:!1},a}return Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(W.a,{title:"Add New Param",visible:this.state.popupVisible,onOk:this.handleOk,onCancel:this.handleCancel},r.a.createElement(q.a,{onChange:this.newFieldName,variant:"outlined",margin:"normal",fullWidth:!0,autoFocus:!0,name:"fieldName",label:"New field name"})),this.state.elements)}}]),n}(V),J=(n(348),function(){function e(t){var n=this;Object(c.a)(this,e),this.useStyles=function(){return Object(C.a)((function(e){return{paper:{marginTop:e.spacing(8),display:"flex",flexDirection:"column",alignItems:"center"},avatar:{margin:e.spacing(1),backgroundColor:e.palette.secondary.main},form:{width:"100%",marginTop:e.spacing(1)},submit:{margin:e.spacing(3,3,2)}}}))},this.back=function(e){e.preventDefault(),n.router.popPage()},this.addParams=function(e){e.preventDefault(),n.dynamicInputRef.popup()},this.action=t.action,this.forms=[],this.elements=[],this.instances=[],this.submit=t.submit,this.router=t.router}return Object(s.a)(e,[{key:"push",value:function(e){this.elements.push(e)}},{key:"pushInstance",value:function(e){this.instances.push(e)}},{key:"build",value:function(){var e=this,t=this.useStyles();return r.a.createElement(L.a,{component:"main",maxWidth:"xs",ref:function(t){return e.containerRef=t}},r.a.createElement(P.a,null),r.a.createElement("div",null,r.a.createElement(F,{ref:function(t){e.warningRef=t}})),r.a.createElement("div",{className:t.paper},r.a.createElement(I.a,{className:t.avatar},r.a.createElement(_.a,null)),r.a.createElement(A.a,{component:"h1",variant:"h5"},this.action),r.a.createElement("form",{className:t.form,noValidate:!0},this.elements,r.a.createElement(z,{ref:function(t){return e.dynamicInputRef=t},form:this}),r.a.createElement(U.a,{color:"primary","aria-label":"outlined primary button group"},r.a.createElement(x.a,{type:"submit",variant:"contained",color:"primary",className:t.submit,onClick:this.submit},"Commit"),r.a.createElement(x.a,{type:"submit",variant:"outlined",color:"primary",className:t.submit,onClick:this.back},"Back"),r.a.createElement(x.a,{type:"submit",variant:"outlined",color:"primary",className:t.submit,onClick:this.addParams},"Add Params")))))}}]),e}()),K=n(103),H=function(){function e(){Object(c.a)(this,e)}return Object(s.a)(e,null,[{key:"splitListToNGroup",value:function(e,t){if(0===e.length)return[e];if(e.length<=t)return[e];var n=Math.floor(e.length/t);n<e.length/t&&(n+=1);for(var a=[],r=0;r<t;r++){for(var i=[],o=r*n;o<Math.min((r+1)*n,e.length);o++)i.push(e[o]);i.length>0&&a.push(i)}return a}},{key:"splitListToNGroupByStepSize",value:function(e,t){if(0===e.length)return[e];if(e.length<=t)return[e];var n=Math.floor(e.length/t);n<e.length/t&&(n+=1);for(var a=[],r=0;r<n;r++){for(var i=[],o=r*t;o<Math.min((r+1)*t,e.length);o++)i.push(e[o]);i.length>0&&a.push(i)}return a}}]),e}();H.setEqual=function(e,t){var n=Object(K.a)(e),a=Object(K.a)(t);if(n.length!==a.length)return!1;var r=!0;return n.forEach((function(e){-1===a.indexOf(e)&&(r=!1)})),r},H.buildTree=function(e){var t,n,a={},r=[];for(n=0;n<e.length;n+=1)a[e[n].id]=n,e[n].childNodes=[];for(n=0;n<e.length;n+=1)if(0!==(t=e[n]).parentId)try{e[a[t.parentId]].childNodes.push(t)}catch(i){console.log("------------"),console.log(t),console.log(a[t.parentId])}else r.push(t);return r},H.throttle=function(e,t){var n;return function(){if(!n){n=setTimeout((function(){return n=null}),t);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return e.apply(this,r)}}},H.debounce=function(e,t){var n=null;return function(){for(var a=this,r=arguments.length,i=new Array(r),o=0;o<r;o++)i[o]=arguments[o];clearTimeout(n),n=setTimeout((function(){return e.apply(a,i)}),t)}};var $=n(477),Q=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).addMonitor=function(e){a.monitors.push(e)},a.form=e.form,a.name=e.name,a.state={values:e.values},a.forms=a.form.forms,a.monitors=[],a.dependencies=e.dependencies,a.collect_dependencies=[],a.action=e.action,a.reload=a.reload.bind(Object(u.a)(a)),a}return Object(s.a)(n,[{key:"reload",value:function(){var e=Object(m.a)(p.a.mark((function e(t){var n,a,r,i,o,c=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.collect_dependencies.push(t),n=new Set(Array.from(this.collect_dependencies).map((function(e){return e.name}))),a=new Set(this.dependencies),!H.setEqual(n,a)){e.next=11;break}return r=new S,i={},this.dependencies.forEach((function(e){return i[e]=c.forms[e]})),e.next=9,r.backend.request(this.action,i,"POST");case 9:200===(o=e.sent).status?this.setState({values:o.content}):$.a.error(o.content,6);case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),n}(V),X=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handleChange=function(e){a.forms[a.name]=e.target.value,a.monitors.forEach((function(e){return e.reload(Object(u.a)(a))}))},a}return Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(q.a,{variant:"outlined",margin:"normal",fullWidth:!0,autoFocus:!0,onChange:this.handleChange,form:this.form,name:this.name,label:this.name})}}]),n}(Q),Y=n(503),Z=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handleChange=function(e){a.forms[a.name]=e.target.value,a.monitors.forEach((function(e){return e.reload(Object(u.a)(a))}))},a}return Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement(q.a,{variant:"outlined",margin:"normal",fullWidth:!0,autoFocus:!0,id:"standard-select-currency",name:this.name,select:!0,label:this.name,onChange:this.handleChange},this.state.values.map((function(e){return r.a.createElement(Y.a,{key:e.name,value:e.value},e.name)})))}}]),n}(Q),ee=n(5),te=n(125),ne=n(479),ae=n(500),re=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handleChange=function(e){a.forms[a.name]=e.target.checked,a.monitors.forEach((function(e){return e.reload(Object(u.a)(a))}))},a}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=Object(ee.a)({root:{color:te.a[400],"&$checked":{color:te.a[600]}},checked:{}})((function(e){return r.a.createElement(ae.a,Object.assign({color:"default"},e))})),n=this.statue.values.map((function(n){return r.a.createElement(ne.a,{control:r.a.createElement(t,{onChange:e.handleChange,value:n}),label:n})}));return r.a.createElement("div",null,n)}}]),n}(Q),ie=n(208),oe=n(493),ce=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;Object(c.a)(this,n),(a=t.call(this,e)).toggleIsExpanded=function(e,t){},a.isRootNode=function(e){return a.state.nodes[0].id===e},a.addMonitor=function(e){a.monitors.push(e)},a.form=e.form,a.name=e.name,a.forms=a.form.forms,a.json=e.json;var r=H.buildTree(a.json);return a.state={nodes:r},a.dependencies=e.dependencies,a.action=e.action,a.monitors=[],a.dependencies=e.dependencies,a.collect_dependencies=new Set,a.reload=a.reload.bind(Object(u.a)(a)),a.handleNodeClick=a.handleNodeClick.bind(Object(u.a)(a)),a.handNodeDoubleClick=a.handNodeDoubleClick.bind(Object(u.a)(a)),a.handleNodeCollapse=a.handleNodeCollapse.bind(Object(u.a)(a)),a.handleNodeExpand=a.handleNodeExpand.bind(Object(u.a)(a)),a.onNodeContextMenu=a.onNodeContextMenu.bind(Object(u.a)(a)),a}return Object(s.a)(n,[{key:"reload",value:function(){var e=Object(m.a)(p.a.mark((function e(t){var n,a,r,i,o,c,s=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.collect_dependencies.add(t),n=new Set(Array.from(this.collect_dependencies).map((function(e){return e.name}))),a=new Set(this.dependencies),!H.setEqual(n,a)){e.next=11;break}return r=new S,i={},this.dependencies.forEach((function(e){return i[e]=s.forms[e]})),e.next=9,r.backend.request(this.action,i);case 9:200===(o=e.sent).status&&(c=H.buildTree(JSON.parse(o.content[0].value)),this.setState({nodes:c}));case 11:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleNodeClick",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r,i=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:r=t.isSelected,a.shiftKey||this.forEachNode(this.state.nodes,(function(e){return e.isSelected=!1})),t.isSelected=null==r||!r,this.setState(this.state),this.forms[this.name]=t.id,this.monitors.forEach((function(e){return e.reload(i)}));case 6:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"handNodeDoubleClick",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.forms[this.name]=t.id,this.monitors.forEach((function(e){return e.reload(r)}));case 2:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"handleNodeCollapse",value:function(){var e=Object(m.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.isExpanded=!1,this.toggleIsExpanded(t.id,!1),this.setState(this.state);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"handleNodeExpand",value:function(){var e=Object(m.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.isExpanded=!0,this.toggleIsExpanded(t.id,!0),this.setState(this.state);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"onNodeContextMenu",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}()},{key:"forEachNode",value:function(e,t){if(null!=e){var n,a=Object(ie.a)(e);try{for(a.s();!(n=a.n()).done;){var r=n.value;t(r),this.forEachNode(r.childNodes,t)}}catch(i){a.e(i)}finally{a.f()}}}},{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(oe.a,{contents:this.state.nodes,onNodeClick:this.handleNodeClick,onNodeCollapse:this.handleNodeCollapse,onNodeExpand:this.handleNodeExpand,onNodeContextMenu:this.onNodeContextMenu,onNodeDoubleClick:this.handNodeDoubleClick}))}}]),n}(r.a.Component),se=Object(s.a)((function e(){Object(c.a)(this,e)}));se.DIR=1,se.FILE=2;var ue=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).subTpe=e.subTpe,a.row=e.row,a}return Object(s.a)(n,[{key:"build",value:function(){var e={name:this.name,values:[]};"TreeSelect"===this.subTpe&&(e={name:this.name,json:JSON.stringify([{values:[]}])});return"Dynamic"===this.subTpe?ye.mapping[this.subTpe](e,this.form):ye.mapping[this.subTpe](e,this.form,this.dependencies,this.action)}}]),n}(Q),le=(n(146),n(370),n(211)),he=n.n(le),fe=(n(377),n(378),n(379),n(216)),pe=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handleChange=function(e){a.forms[a.name]=a.editorRef.editor.getValue(),a.monitors.forEach((function(e){return e.reload(Object(u.a)(a))}))},a.language=e.values.values[0]&&e.values.values[0].name||"python",a}return Object(s.a)(n,[{key:"render",value:function(){var e=this;return r.a.createElement("div",null,r.a.createElement("div",null,this.name),r.a.createElement(fe.a,{defaultSize:{height:"500px"},onResize:function(){e.editorRef.editor.resize()}},r.a.createElement(he.a,{ref:function(t){return e.editorRef=t},mode:this.language,theme:"github",width:"100%",height:"100%",onChange:this.handleChange,name:"mlsql_editor",fontSize:16,showPrintMargin:!0,showGutter:!0,highlightActiveLine:!0,editorProps:{$blockScrolling:1/0},setOptions:{enableBasicAutocompletion:!0,enableLiveAutocompletion:!0,enableSnippets:!1,showLineNumbers:!0,tabSize:2,autoScrollEditorIntoView:!0}})))}}]),n}(Q),me=n(217),de=n(123),ve=n(212),be=n.n(ve),ge=(n(392),{width:200,height:200,borderWidth:2,borderColor:"#666",borderStyle:"dashed",borderRadius:5}),Oe={borderStyle:"solid",borderColor:"#6c6",backgroundColor:"#eee"},Ee={borderStyle:"solid",borderColor:"#c66",backgroundColor:"#eee"},je=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).handleChange=function(e){},a.onDrop=function(e){a.setState({files:e});var t={},n=E(),r=n.token,i=n.userName;i&&(t[g.USER_NAME]=i),r&&(t[g.LOGIN_TOKEN]=r);var o=[];for(var c in t){var s=encodeURIComponent(c),l=encodeURIComponent(t[c]);o.push(s+"="+l)}var h="/run?action="+a.state.action+"&"+o.join("&"),f=be.a.post(h);e.forEach((function(e){f.attach(e.path,e)})),f.end((function(t,n){if(a.setState({files:[]}),t)a.setState({msg:t.toString()+"\n"+n.text+"\n  Sometimes this caused by your upload space is not enough or backend fails"});else if(n.ok){var r=JSON.parse(n.text).map((function(e){return e.path}));a.forms[a.name]=r.join(","),a.monitors.forEach((function(e){return e.reload(Object(u.a)(a))})),a.setState({msg:"total files:"+e.length+" are uploaded. "})}}))},a.state={files:[],msg:"",action:e.action},a}return Object(s.a)(n,[{key:"render",value:function(){var e=this.state.files.map((function(e){return r.a.createElement("li",{key:e.name},e.path," - ",e.size," bytes")}));return r.a.createElement("section",{className:"fileListStyle"},r.a.createElement("div",null,r.a.createElement(me.a,{onDrop:this.onDrop,getDataTransferItems:function(e){return Object(de.a)(e)}},(function(e){var t=e.getRootProps,n=e.getInputProps,a=e.isDragActive,i=e.isDragAccept,o=e.isDragReject,c=(e.acceptedFiles,e.rejectedFiles,Object(d.a)({},ge));return c=a?Object(d.a)(Object(d.a)({},c),Oe):c,c=o?Object(d.a)(Object(d.a)({},c),Ee):c,r.a.createElement("div",Object.assign({},t(),{style:c}),r.a.createElement("input",n()),r.a.createElement("div",null,i?"Drop":"Drag"," files here..."),o&&r.a.createElement("div",null,"Unsupported file type..."))}))),r.a.createElement("aside",null,r.a.createElement("h4",null,0===e.length?"":"Files"),r.a.createElement("ul",null,e)),r.a.createElement("div",null,this.state.msg?this.state.msg:""))}}]),n}(Q),ye=Object(s.a)((function e(){Object(c.a)(this,e)}));ye.mapping={Input:function(e,t,n,a){return r.a.createElement(X,{ref:function(e){return t.pushInstance(e)},form:t,name:e.name,values:[],dependencies:n,action:a})},Select:function(e,t,n,a){return r.a.createElement(Z,{ref:function(e){return t.pushInstance(e)},form:t,name:e.name,values:e.values,dependencies:n,action:a})},CheckBox:function(e,t,n,a){return r.a.createElement(re,{ref:function(e){return t.pushInstance(e)},form:t,name:e.name,values:e.values,dependencies:n,action:a})},TreeSelect:function(e,t,n,a){return r.a.createElement(ce,{ref:function(e){return t.pushInstance(e)},form:t,name:e.name,json:JSON.parse(e.json)[0].values||[],values:[],dependencies:n,action:a})},Editor:function(e,t,n,a){return r.a.createElement(pe,{ref:function(e){return t.pushInstance(e)},form:t,name:e.name,values:e.values,dependencies:n,action:a})},Upload:function(e,t,n,a){return r.a.createElement(je,{ref:function(e){return t.pushInstance(e)},form:t,name:e.name,dependencies:n,action:e.valueProviderName})},Dynamic:function(e,t){var n={name:e.name,subTpe:e.subTpe,form:t,action:e.valueProviderName,dependencies:e.depends,row:e};return new ue(n).build()}};var ke=function(){function e(t,n){Object(c.a)(this,e),this.proxy=t,this.router=n}return Object(s.a)(e,[{key:"build",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n,a){var r,i,o;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.proxy.post(t,{__HELP__:"true"});case 2:return r=e.sent,i=r.content,o=new J({action:t,submit:n,router:this.router}),i.map((function(e){var t=ye.mapping[e.tpe](e,o);o.push(t)})),e.abrupt("return",o);case 7:case"end":return e.stop()}}),e,this)})));return function(t,n,a){return e.apply(this,arguments)}}()}]),e}(),Ne=n(484),we=n(486),Se=n(481),Ce=n(483),Ie=n(485),xe=n(482),Pe=n(218),Te=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).load=function(e){Array.isArray(e)||(e=[e]);var t=0,n={};e.forEach((function(e){var a=Object.keys(e).length;a>t&&(t=a,n=e)}));var r=Object.keys(n)||[],i=e.map((function(e){return r.forEach((function(t,n){var a=e[t];"object"===typeof a&&(e[t]=JSON.stringify(a).substring(0,300)),"array"===typeof a&&(e[t]=a.join(",").substring(0,300)),"boolean"===typeof a&&(e[t]=a.toString())})),e}));a.setState({rows:i,columns:r})},a.useStyles=function(){return Object(C.a)({table:{minWidth:650}})},a.props=e,a.state={rows:[],columns:[]},a}return Object(s.a)(n,[{key:"render",value:function(){var e=this,t=this.useStyles(),n=this.state.columns.map((function(e){return r.a.createElement(Se.a,null,e)})),a=this.state.rows.map((function(t){var n=e.state.columns.map((function(e){return r.a.createElement(Se.a,{component:"th",scope:"row"},t[e])}));return r.a.createElement(xe.a,null,n)}));return r.a.createElement(Ce.a,{component:Pe.a},r.a.createElement(Ne.a,{className:t.table,"aria-label":"simple table"},r.a.createElement(Ie.a,null,r.a.createElement(xe.a,null,n)),r.a.createElement(we.a,null,a)))}}]),n}(r.a.Component),_e=(n(393),function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).router=e.router,e.submit?a.submit=e.submit:a.submit=a.submit.bind(Object(u.a)(a)),a.state={action:e.action},a}return Object(s.a)(n,[{key:"submit",value:function(){var e=Object(m.a)(p.a.mark((function e(t){var n,a,r,i;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),n=new S,a=this.form.forms,Object.keys(a).forEach((function(e){a[e]||delete a[e]})),e.next=6,n.backend.request(this.state.action,a);case 6:if(r=e.sent,i=this.errorView,200!==r.status&&i.warn("Response error",r.content),200===r.status&&this.view)try{"userLogin"===this.state.action&&(o=r.content[0],localStorage.setItem(g.LOGIN_TOKEN,JSON.stringify(o)),this.router.refreshBar()),this.view.load(r.content)}catch(c){i.warn("Data can not display in table",r.content+"")}case 10:case"end":return e.stop()}var o}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(m.a)(p.a.mark((function e(){var t,n,a,r;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new S,n=new ke(t,this.router),e.next=4,n.build(this.state.action,this.submit);case 4:return this.form=e.sent,e.next=7,this.setStateSync({form:this.form.build()});case 7:a=this.form.instances.filter((function(e){return e.dependencies})),r={},this.form.instances.filter((function(e){return!e.dependencies})).forEach((function(e){r[e.name]=e})),a.forEach((function(e){e.dependencies.forEach((function(t){r[t].addMonitor(e)}))}));case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"api_box"},r.a.createElement("div",null,r.a.createElement(F,{ref:function(t){return e.errorView=t}})),r.a.createElement("div",null,this.state.form),r.a.createElement("div",{style:{marginTop:"30px"}},r.a.createElement(Te,{ref:function(t){return e.view=t}})))}}]),n}(V)),Ae=n(487),Le=n(489),De=n(488);var Re=Object(ee.a)({card:{minWidth:275},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}})((function(e){var t=e.classes,n=e.card,a=e.handleClick;return r.a.createElement(Ae.a,{className:t.card},r.a.createElement(De.a,null,r.a.createElement(A.a,{variant:"h5",component:"h2"},n.name),r.a.createElement(A.a,{className:t.pos,color:"textSecondary"},"API"),r.a.createElement(A.a,{component:"p"},"No Description")),r.a.createElement(Le.a,null,r.a.createElement(x.a,{onClick:a,size:"large"},"View")))})),Me=(n(394),function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).useStyles=function(){return Object(C.a)((function(e){return{root:{width:"100%",maxWidth:"100%",backgroundColor:e.palette.background.paper}}}))},a.router=e.router,a.action=e.action,a.state={},a.handleListItemClick=a.handleListItemClick.bind(Object(u.a)(a)),a}return Object(s.a)(n,[{key:"handleListItemClick",value:function(){var e=Object(m.a)(p.a.mark((function e(t,n){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.router.toAction(n);case 1:case"end":return e.stop()}}),e,this)})));return function(t,n){return e.apply(this,arguments)}}()},{key:"goToNav",value:function(){var e=Object(m.a)(p.a.mark((function e(t){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:this.router.toNav();case 1:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"componentDidMount",value:function(){var e=Object(m.a)(p.a.mark((function e(){var t,n,a,i,o,c;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new S,e.next=3,t.get(this.action,{});case 3:return n=e.sent,a=this,i=n.content.map((function(e,t){return e})),o={},i.forEach((function(e){var t=r.a.createElement("div",{className:"card"},r.a.createElement(Re,{card:e,handleClick:function(t){return a.handleListItemClick(t,e.name)}})),n=e.groupName||"Others";o.hasOwnProperty(n)||(o[n]=[]),o[n].push(t)})),c=Object.entries(o).map((function(e){var t=Object(O.a)(e,2),n=t[0],a=t[1];return r.a.createElement("div",{key:n},r.a.createElement("div",{className:"cards_title"},r.a.createElement("span",{className:"cards_title_text"},n)),r.a.createElement("div",{className:"cards"},a))})),e.next=11,this.setStateSync({items:c});case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this.useStyles();return r.a.createElement("div",{className:e.root},this.state.items)}}]),n}(V)),Ge=n(498),Be=n(490),Fe=n(494),Ue=n(101),Ve=(n(395),Ge.a.Step),We=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).openNotificationWithIcon=function(e,t,n){Be.a[e]({message:t,description:n})},a.router=e.router,a.state={current:0,steps:[],apiNavId:e.apiNavId},a}return Object(s.a)(n,[{key:"componentDidMount",value:function(){var e=Object(m.a)(p.a.mark((function e(){var t,n,r,i=this;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=new S,e.next=3,t.get(w.LIST_APINavItems,{apiNavId:this.state.apiNavId});case 3:200===(n=e.sent).status&&(r=n.content.map((function(e,t){return{title:e.title,content:function(){return a.createElement(Fe.a,{title:e.title,bordered:!0},a.createElement(_e,{router:i.router,key:t,action:e.action}))}}})),this.setState({steps:r}));case 5:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"next",value:function(){var e=this.state.current+1;this.setState({current:e})}},{key:"prev",value:function(){var e=this.state.current-1;this.setState({current:e})}},{key:"render",value:function(){var e=this,t=this.state.current;return 0==this.state.steps.length?a.createElement("div",null,"No Items Available"):a.createElement("div",{className:"api_nav"},a.createElement("div",{className:"steps-action",style:{marginBottom:"30px"}},t<this.state.steps.length-1&&a.createElement(Ue.a,{type:"primary",onClick:function(){return e.next()}},"Next Step"),t===this.state.steps.length-1&&a.createElement(Ue.a,{type:"primary",onClick:function(){return $.a.success("Processing complete!")}},"Done"),t>0&&a.createElement(Ue.a,{style:{marginLeft:8},onClick:function(){return e.prev()}},"Previous Step")),a.createElement("div",{className:"steps-nav"},a.createElement(Ge.a,{current:t},this.state.steps.map((function(e){return a.createElement(Ve,{key:e.title,title:e.title})})))),a.createElement("div",{className:"steps-content",style:{"margin-top":"30px"}},this.state.steps[t].content()))}}]),n}(a.Component),qe=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).app=e.app,a.router=e.router,a.pages=[{func:a.toPage1,params:[]}],a}return Object(s.a)(n,[{key:"popPage",value:function(){this.pages.pop();var e=this.pages.pop();if(e){var t=e.func,n=e.params;t.apply(void 0,Object(K.a)(n))}else this.router?this.router.popPage():this.toPage1()}},{key:"toPage1",value:function(){}}]),n}(r.a.Component),ze=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).toPage1=function(){a.pages.push({func:a.toPage1,params:[]}),a.setState({page1:!0,page2:!1})},a.toPage2=function(e){a.pages.push({func:a.toPage2,params:[e]}),a.setState({page1:!1,page2:!0,apiNavId:e})},a.state={page1:!0,page2:!1,apiNavId:-1},a.submit=a.submit.bind(Object(u.a)(a)),a.toPage1=a.toPage1.bind(Object(u.a)(a)),a.toPage2=a.toPage2.bind(Object(u.a)(a)),a.pages=[{func:a.toPage1,params:[]}],a}return Object(s.a)(n,[{key:"submit",value:function(){var e=Object(m.a)(p.a.mark((function e(t){var n;return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),n=this.apiView.form.forms,this.toPage2(n.apiNavId);case 3:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"render",value:function(){var e=this;return this.state.page1?r.a.createElement("div",null,r.a.createElement(_e,{ref:function(t){return e.apiView=t},action:w.ChooseAPINav,router:this,submit:this.submit})):r.a.createElement("div",null,r.a.createElement(We,{router:this,apiNavId:this.state.apiNavId}))}}]),n}(qe),Je=n(491),Ke=n(492),He=n(478),$e=n(214),Qe=n.n($e);var Xe=Object(ee.a)({root:{flexGrow:1},grow:{flexGrow:1},menuButton:{marginLeft:-12,marginRight:20}})((function(e){var t=e.classes,n=e.router,a=E().token;return r.a.createElement("div",{className:t.root},r.a.createElement(Je.a,{position:"static"},r.a.createElement(Ke.a,null,r.a.createElement(He.a,{className:t.menuButton,color:"inherit","aria-label":"Menu"},r.a.createElement(Qe.a,null)),r.a.createElement(A.a,null,r.a.createElement(x.a,{onClick:function(){n.toNav()},className:t.menuButton,color:"inherit","aria-label":"Menu"},"API Chain")),r.a.createElement(A.a,null,r.a.createElement(x.a,{onClick:function(){n.toPage1()},className:t.menuButton,color:"inherit","aria-label":"Menu"},"API List")),r.a.createElement(A.a,{variant:"h6",color:"inherit",className:t.grow},"APIs Master"),a?r.a.createElement("div",null,r.a.createElement(x.a,{onClick:Object(m.a)(p.a.mark((function e(){return p.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j();case 2:n.toNav();case 3:case"end":return e.stop()}}),e)}))),color:"inherit"},"Logout"),E().userName):r.a.createElement("div",null,r.a.createElement(x.a,{onClick:function(){n.toAction("userLogin")},color:"inherit"},"Login"),r.a.createElement(x.a,{onClick:function(){n.toAction("userReg")},color:"inherit"},"Register")))))})),Ye=function(e){Object(l.a)(n,e);var t=Object(h.a)(n);function n(e){var a;return Object(c.a)(this,n),(a=t.call(this,e)).toPage1=function(){a.pages.push({func:a.toPage1,params:[]}),a.setState({page1:!0,page2:!1,nav:!1})},a.toAction=function(e){a.pages.push({func:a.toAction,params:[e]}),a.setState({page1:!1,page2:!0,nav:!1,current_action:e})},a.toNav=function(){a.pages.push({func:a.toNav,params:[]}),a.setState({page1:!1,page2:!1,nav:!0})},a.refreshBar=function(){a.setState({refresh:a.state.refresh+1})},a.state={page1:!1,page2:!1,nav:!0,current_action:w.LIST_ACTIONS,refresh:0},a.toPage1=a.toPage1.bind(Object(u.a)(a)),a.toAction=a.toAction.bind(Object(u.a)(a)),a.toNav=a.toNav.bind(Object(u.a)(a)),a.popPage=a.popPage.bind(Object(u.a)(a)),a.pages=[{func:a.toPage1,params:[]}],a}return Object(s.a)(n,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(Xe,{router:this}),this.state.page1&&r.a.createElement("div",null,r.a.createElement(Me,{router:this,action:w.LIST_ACTIONS})),this.state.page2&&r.a.createElement("div",null,r.a.createElement(_e,{router:this,key:this.state.current_action,action:this.state.current_action})),this.state.nav&&r.a.createElement("div",null,r.a.createElement(ze,{router:this,app:this.app})))}}]),n}(qe);var Ze=function(){return r.a.createElement("div",{className:"App"},r.a.createElement(Ye,{app:this}))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Ze,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[290,1,2]]]);
//# sourceMappingURL=main.010903e6.chunk.js.map