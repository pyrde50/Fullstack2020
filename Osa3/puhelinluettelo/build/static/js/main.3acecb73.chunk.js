(this.webpackJsonppuhelinluettelo=this.webpackJsonppuhelinluettelo||[]).push([[0],{38:function(e,n,t){"use strict";t.r(n);var c=t(3),a=t(0),o=t(2),r=t(15),i=t.n(r),u=function(e){return Object(a.jsxs)("form",{children:[Object(a.jsxs)("div",{children:["name: ",Object(a.jsx)("input",{value:e.newName,onChange:e.editnewName})," "]}),Object(a.jsxs)("div",{children:["number: ",Object(a.jsx)("input",{value:e.newNumber,onChange:e.editNewNumber})," "]}),Object(a.jsx)("div",{children:Object(a.jsx)("button",{type:"submit",onClick:e.addPerson,children:"add"})})]})},l=function(e){return Object(a.jsx)("div",{children:Object(a.jsxs)("div",{children:["filter shown with",Object(a.jsx)("input",{value:e.findName,onChange:e.editFindName})," "]})})},d=(t(6),function(e){var n=e.message;return null==n?null:Object(a.jsx)("div",{className:"finding",children:n})}),s=function(e){var n=e.errorMessage;return null==n?null:Object(a.jsx)("div",{className:"error",children:n})},j=function(e){return e.filterPeople.map((function(n){return Object(a.jsxs)("div",{children:[n.name," ",n.number," ",Object(a.jsx)("button",{value:n.id,onClick:e.DeletePerson,children:"delete"})]},n.name)}))},b=t(4),f=t.n(b),m="/api/persons",h=function(){return f.a.get(m)},O=function(e){return f.a.post(m,e)},v=function(e){return f.a.delete("".concat(m,"/").concat(e.id))},g=function(e){return f.a.get("".concat(m,"/").concat(e))},x=function(e){return f.a.put("".concat(m,"/").concat(e.id),{name:e.name,number:e.number})},p=function(){var e=Object(o.useState)([]),n=Object(c.a)(e,2),t=n[0],r=n[1],i=Object(o.useState)(""),b=Object(c.a)(i,2),f=b[0],m=b[1],p=Object(o.useState)(""),w=Object(c.a)(p,2),N=w[0],C=w[1],P=Object(o.useState)(""),S=Object(c.a)(P,2),k=S[0],T=S[1],y=Object(o.useState)(8),D=Object(c.a)(y,2),E=D[0],F=D[1],J=Object(o.useState)(null),L=Object(c.a)(J,2),M=L[0],B=L[1],I=Object(o.useState)(null),q=Object(c.a)(I,2),z=q[0],A=q[1];Object(o.useEffect)((function(){h().then((function(e){r(e.data),F(e.data.id)}))}),[]);var G=0===k.length?t:t.filter((function(e){return!0===e.name.toLowerCase().includes(k.toLowerCase())}));return Object(a.jsxs)("div",{children:[Object(a.jsx)("h2",{children:"Phonebook"}),Object(a.jsx)(d,{message:M}),Object(a.jsx)(s,{errorMessage:z}),Object(a.jsx)(l,{findName:k,editFindName:function(e){T(e.target.value)}}),Object(a.jsx)("h2",{children:"add new"}),Object(a.jsx)(u,{newName:f,editnewName:function(e){m(e.target.value)},newNumber:N,editNewNumber:function(e){C(e.target.value)},addPerson:function(e){if(e.preventDefault(),t.some((function(e){return e.name===f}))){if(window.confirm("".concat(f," is already added to phonebook, replace the old number with a new one?"))){var n={name:f,number:N,id:t.filter((function(e){return e.name===f}))[0].id};x(n).then((function(e){r(t.filter((function(n){return n.id!==e.data.id})).concat(n)),console.log(e.data),B("".concat(e.data.name," number changed to ").concat(e.data.number)),setTimeout((function(){B(null)}),4e3)}))}}else O({name:f,number:N,id:E+1}).then((function(e){console.log(e),r(t.concat(e.data)),m(""),C(""),B("".concat(e.data.name," added")),setTimeout((function(){B(null)}),4e3)})).catch((function(e){console.log(e.response.data.error),A("error: ".concat(e.response.data.error)),setTimeout((function(){A(null)}),7e3)}))}}),Object(a.jsx)("h2",{children:"Numbers"}),Object(a.jsx)(j,{filterPeople:G,DeletePerson:function(e){g(e.target.value).then((function(e){window.confirm("Delete ".concat(e.data.name,"?"))&&v(e.data).then((function(n){console.log(e.data),r(t.filter((function(n){return n.id!==e.data.id}))),console.log(t),B("".concat(e.data.name," deleted")),setTimeout((function(){B(null)}),4e3)}))})).catch((function(n){console.log(e.target.value);var c=t.filter((function(n){return n.id===e.target.value}))[0].name;A("information of ".concat(c," has already been removed from server")),setTimeout((function(){A(null)}),7e3)}))}})]})};i.a.render(Object(a.jsx)(p,{}),document.getElementById("root"))},6:function(e,n,t){}},[[38,1,2]]]);
//# sourceMappingURL=main.3acecb73.chunk.js.map