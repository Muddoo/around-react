(this["webpackJsonparound-us"]=this["webpackJsonparound-us"]||[]).push([[0],{19:function(e,t,a){},21:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a(1),r=a.n(c),o=a(10),s=a.n(o),i=(a(19),a(2)),l=a.p+"static/media/Vectorlogo.4e8e0a1d.svg";var u=function(e){return Object(n.jsx)("header",{className:"header",children:Object(n.jsx)("img",{draggable:"false",src:e.logo,alt:"logo",className:"logo"})})},b=a(3),d=a(13);var j=function(e){var t=e.card,a=e.onCardClick,c=e.handleReady,r=e.onCardDelete,o=e.isOwner,s=e.isLiked,i=e.onCardLike;return Object(n.jsxs)("div",{className:"card","data-id":t._id,children:[Object(n.jsx)("img",{src:t.link,draggable:"false",alt:"card image",className:"card__image",onClick:function(){return a(t)},onLoad:c}),Object(n.jsxs)("div",{className:"card__details",children:[Object(n.jsx)("h2",{className:"card__text",children:t.name}),Object(n.jsx)("button",{className:"card__icon-heart ".concat(s(t)&&"card__icon-heart_black animate"),type:"button","aria-label":"heart-button",title:"like",onClick:function(){return i(t)}}),Object(n.jsx)("span",{className:"card__likes",children:t.likes.length})]}),Object(n.jsx)("button",{className:"card__icon-delete",type:"button","aria-label":"trash-button",title:"delete",onClick:function(e){return r(t)},hidden:!o(t)})]})};var p=function(e){var t=e.cards,a=e.onCardClick,r=e.onCardDelete,o=e.isOwner,s=e.isLiked,l=e.onCardLike,u=Object(c.useState)(0),b=Object(i.a)(u,2),d=b[0],p=b[1];function m(){if(d===t.length)return p(1);p(d+1)}return Object(n.jsx)("section",{className:"cards ".concat(d===t.length?null:"hidden"),children:t.map((function(e){return Object(n.jsx)(j,{card:e,onCardClick:a,handleReady:m,onCardDelete:r,isOwner:o,isLiked:s,onCardLike:l},e._id)}))})},m=a(5),O=a.n(m),f=a(8),h=a(11),_=a(12),x=new(function(){function e(t){var a=t.baseUrl,n=t.options;Object(h.a)(this,e),this._baseUrl=a,this._options=n}return Object(_.a)(e,[{key:"queryCards",value:function(){var e=Object(f.a)(O.a.mark((function e(t){var a,n,c,r,o,s,i;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.query,n=void 0===a?"":a,c=t.method,r=void 0===c?"GET":c,o=t.body,s=void 0===o?null:o,this._options=Object(b.a)(Object(b.a)({},this._options),{},{method:r,body:s&&JSON.stringify(s)}),e.next=4,fetch("".concat(this._baseUrl,"/cards/").concat(n),this._options);case 4:return i=e.sent,e.abrupt("return",i.ok?i.json():Promise.reject("Error: ".concat(i.status," - ").concat(i.statusText," - ").concat(i.url)));case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()},{key:"getUser",value:function(){var e=Object(f.a)(O.a.mark((function e(){var t;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("".concat(this._baseUrl,"/users/me"),Object(b.a)(Object(b.a)({},this._options),{},{method:"GET"}));case 2:return t=e.sent,e.abrupt("return",t.ok?t.json():Promise.reject("Error: ".concat(t.status," - ").concat(t.statusText," - ").concat(t.url)));case 4:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"updateProfile",value:function(){var e=Object(f.a)(O.a.mark((function e(t){var a,n,c,r,o,s;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.avatar,n=void 0===a?"":a,c=t.method,r=void 0===c?"PATCH":c,o=t.body,this._options=Object(b.a)(Object(b.a)({},this._options),{},{method:r,body:JSON.stringify(o)}),e.next=4,fetch("".concat(this._baseUrl,"/users/me/").concat(n),this._options);case 4:return s=e.sent,e.abrupt("return",s.ok?s.json():Promise.reject("Error: ".concat(s.status," - ").concat(s.statusText," - ").concat(s.url)));case 6:case"end":return e.stop()}}),e,this)})));return function(t){return e.apply(this,arguments)}}()}]),e}())({baseUrl:"https://around.nomoreparties.co/v1/group-7",options:{headers:{authorization:"53ef19e5-74f0-45cf-b7f3-6d5e1b396f52","Content-Type":"application/json"}}});var v=function(e){var t=e.onEditAvatar,a=e.onEditProfile,r=e.onAddPlace,o=e.onCardClick,s=e.onCardDelete,l=Object(c.useState)(""),u=Object(i.a)(l,2),j=u[0],m=u[1],O=Object(c.useState)(""),f=Object(i.a)(O,2),h=f[0],_=f[1],v=Object(c.useState)(""),g=Object(i.a)(v,2),C=g[0],k=g[1],y=Object(c.useState)(""),N=Object(i.a)(y,2),S=N[0],E=N[1],T=Object(c.useState)([]),L=Object(i.a)(T,2),w=L[0],P=L[1],U=Object(c.useState)(!1),D=Object(i.a)(U,2),A=D[0],q=D[1],F=Object(c.useState)(!1),I=Object(i.a)(F,2),J=I[0],B=I[1];function G(e){return e.likes.some((function(e){return e._id===j}))}return Object(c.useEffect)((function(){Promise.all([x.getUser(),x.queryCards({})]).then((function(e){var t=Object(i.a)(e,2),a=t[0],n=t[1];m(a._id),_(a.name),k(a.about),E(a.avatar),P(n)})).catch((function(e){return console.log(e)}))}),[]),Object(c.useEffect)((function(){if(J){var e=G(J)?"DELETE":"PUT",t={query:"likes/".concat(J._id),method:e},a=w.map((function(t){var a="PUT"===e?[].concat(Object(d.a)(J.likes),[{_id:j}]):J.likes.filter((function(e){return e._id!==j}));return J._id===t._id?Object(b.a)(Object(b.a)({},t),{},{likes:a}):t}));P(a),x.queryCards(t).catch((function(e){console.log(e),console.log(w,a),P(w)}))}}),[J]),Object(n.jsxs)("main",{children:[Object(n.jsxs)("section",{className:"profile ".concat(h&&C&&S&&A?null:"hidden"),children:[Object(n.jsx)("div",{className:"profile__wrapper",onClick:t,children:Object(n.jsx)("img",{src:S,draggable:"false",alt:"profile image",className:"profile__image",onLoad:function(){return q(!0)}})}),Object(n.jsxs)("div",{className:"profile__info",children:[Object(n.jsx)("h1",{className:"profile__name",children:h}),Object(n.jsx)("p",{className:"profile__text",children:C}),Object(n.jsx)("button",{className:"profile__edit-button","aria-label":"edit-button",type:"button",onClick:a})]}),Object(n.jsx)("button",{className:"profile__add-button","aria-label":"close-button",type:"button",onClick:r})]}),Object(n.jsx)(p,{cards:w,userId:j,isOwner:function(e){return e.owner._id===j},isLiked:G,onCardClick:o,onCardDelete:s,onCardLike:function(e){B(e)}})]})};var g=function(){return Object(n.jsx)("footer",{className:"footer",children:Object(n.jsx)("p",{className:"footer__text",children:" \xa9 2020 Around The U.S."})})},C=a(4);var k=function(e){var t=e.type,a=e.placeholder,c=e.name,r=e.min,o=e.max,s=e.value,i=e.error,l=e.handleChange;return Object(n.jsxs)(n.Fragment,{children:[Object(n.jsx)("input",{type:t,className:"popup__field ".concat(i&&"popup__field_border_red"),placeholder:a,name:c,autoComplete:"off",spellCheck:"false",minLength:r,maxLength:o,value:s,onChange:function(e){return l(e,c)}}),Object(n.jsx)("span",{className:"popup__error",children:i})]})};var y=function(e){var t=e.name,a=e.title,r=e.isOpen,o=e.onClose,s=e.submitText,l=e.inputs,u=(e.state,Object(c.useState)({})),d=Object(i.a)(u,2),j=d[0],p=d[1],m=Object(c.useState)({}),O=Object(i.a)(m,2),f=O[0],h=O[1];function _(e,t){p(Object(b.a)(Object(b.a)({},j),{},Object(C.a)({},t,e.target.value.trim()))),h(Object(b.a)(Object(b.a)({},f),{},Object(C.a)({},t,e.target.validationMessage)))}function x(){var e=Object.values(j).every((function(e){return""!==e})),t=Object.values(f).some((function(e){return""!==e}));return!e||t}return Object(c.useEffect)((function(){null===l||void 0===l||l.forEach((function(e){var t=e.name;p(Object(b.a)(Object(b.a)({},j),{},Object(C.a)({},t,""))),h(Object(b.a)(Object(b.a)({},f),{},Object(C.a)({},t,"")))}))}),[]),Object(n.jsx)("div",{className:"popup popup_".concat(t," \n          ").concat(r&&"visible"),onClick:o,onSubmit:function(e){e.preventDefault()},children:Object(n.jsxs)("form",{action:"#",className:"popup__form",name:t,noValidate:!0,children:[Object(n.jsx)("button",{className:"popup__close","aria-label":"close-button",type:"button"}),Object(n.jsx)("h3",{className:"popup__header",children:a}),l&&l.map((function(e,t){var a=e.type,c=e.placeholder,r=e.name,o=e.min,s=e.max;return Object(n.jsx)(k,{type:a,placeholder:c,name:r,min:o,max:s,value:j[r]||"",error:f[r]||"",handleChange:_},t)})),Object(n.jsx)("button",{type:"submit",className:"popup__submit ".concat(x()&&"inactive"),"aria-label":"submit-button",disabled:x(),children:s})]})})};var N=function(e){var t=Object(c.useState)(""),a=Object(i.a)(t,2),r=a[0],o=a[1],s=e.card,l=e.onClose;return Object(c.useEffect)((function(){return s?o(s):null})),Object(n.jsx)("figure",{className:"popup popup_figure ".concat(s?"visible":null),onClick:l,children:Object(n.jsxs)("div",{className:"popup__container",children:[Object(n.jsx)("img",{src:r&&r.link,draggable:"false",alt:"popup image",className:"popup__image"}),Object(n.jsx)("p",{className:"popup__caption",children:r.name}),Object(n.jsx)("button",{className:"popup__close popup__close_fig","aria-label":"close-button",type:"button",title:"close"})]})})};var S=function(){var e=Object(c.useState)(!1),t=Object(i.a)(e,2),a=t[0],r=t[1],o=Object(c.useState)(!1),s=Object(i.a)(o,2),b=s[0],d=s[1],j=Object(c.useState)(!1),p=Object(i.a)(j,2),m=p[0],O=p[1],f=Object(c.useState)(""),h=Object(i.a)(f,2),_=h[0],x=h[1],C=Object(c.useState)(""),k=Object(i.a)(C,2),S=k[0],E=k[1];function T(e){(e.target.classList.contains("popup")||e.target.classList.contains("popup__close"))&&(r(!1),d(!1),O(!1),x(""),E(""))}return Object(n.jsxs)("div",{className:"page",children:[Object(n.jsx)(u,{logo:l}),Object(n.jsx)(v,{onEditAvatar:function(){r(!0)},onEditProfile:function(){d(!0)},onAddPlace:function(){O(!0)},onCardClick:function(e){x(e)},onCardDelete:function(e){E(e)}}),Object(n.jsx)(g,{}),Object(n.jsx)(y,{title:"Change profile picture",name:"profile-photo",isOpen:a,onClose:T,inputs:[{type:"url",placeholder:"Image link",name:"profile-image"}],submitText:"Save"}),Object(n.jsx)(y,{title:"Edit profile",name:"profile-info",isOpen:b,onClose:T,inputs:[{type:"text",placeholder:"Name",name:"name",min:2,max:40},{type:"text",placeholder:"About me",name:"about",min:2,max:200}],submitText:"Save"}),Object(n.jsx)(y,{title:"New place",name:"card",isOpen:m,onClose:T,inputs:[{type:"text",placeholder:"Title",name:"title",min:2,max:30},{type:"url",placeholder:"Image link",name:"image"}],submitText:"Create"}),Object(n.jsx)(y,{title:"Are you sure?",name:"delete",isOpen:S,onClose:T,submitText:"Yes",state:"active"}),Object(n.jsx)(N,{card:_,onClose:T})]})},E=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,22)).then((function(t){var a=t.getCLS,n=t.getFID,c=t.getFCP,r=t.getLCP,o=t.getTTFB;a(e),n(e),c(e),r(e),o(e)}))};s.a.render(Object(n.jsx)(r.a.StrictMode,{children:Object(n.jsx)(S,{})}),document.getElementById("root")),E()}},[[21,1,2]]]);
//# sourceMappingURL=main.c9d86e6a.chunk.js.map