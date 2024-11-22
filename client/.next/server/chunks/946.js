exports.id=946,exports.ids=[946],exports.modules={8869:(e,r,t)=>{"use strict";t.r(r),t.d(r,{"406cc605139f9d4886f6113a2d48c575ce0e6b572b":()=>s,"40a71dd35379283a8c2544408b6922ebdd315193f2":()=>n,"40ec096daa3bcb54718558d98dcabbe9e42725ca7f":()=>d,"602120e49e33be750c274492363c9a5c9dc2e83f3c":()=>c,"60e3818e0303e036dd90f878bfa9ff4a75d4b3dcc7":()=>l,"70bcb7a1e738dc94ab657f840a1abc0c8929391a88":()=>f});var o=t(1590);t(376);var a=t(7735);async function s(e){try{let r=await fetch("http://localhost:8080/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok){let e=await r.text();throw Error(e||"Failed to login")}let t=await r.json();return console.log("Login successful",t),t}catch(e){throw console.error("Error logging in:",e),e}}async function n(e){try{let r=await fetch("http://localhost:8080/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});if(!r.ok){let e=await r.text();throw Error(e||"Failed to register")}let t=await r.json();return console.log("Registration successful",t),{success:!0,...t}}catch(e){throw console.error("Error registering:",e),e}}async function i(e,r,t={}){r&&(t.headers={...t.headers,Authorization:`Bearer ${r}`});let o=await fetch(e,t);if(!o.ok)throw Error("Network response was not ok");return o.json()}async function d(e){try{return await i("http://localhost:8080/todos",e)}catch(e){console.error("Error fetching todos:",e)}}async function c(e,r){try{return await i("http://localhost:8080/todos",e,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)})}catch(e){console.error("Error creating todo:",e)}}async function l(e,r){let t=r.get("id");try{let r=await i(`http://localhost:8080/todos/${t}`,e,{method:"DELETE"});return(0,a.revalidatePath)("/"),r}catch(e){console.error("Error deleting todo:",e)}}async function f(e,r,t){try{let o=await i(`http://localhost:8080/todos/${r}`,e,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)});return(0,a.revalidatePath)("/"),o}catch(e){console.error("Error updating todo:",e)}}(0,t(9344).D)([s,n,d,c,l,f]),(0,o.A)(s,"406cc605139f9d4886f6113a2d48c575ce0e6b572b",null),(0,o.A)(n,"40a71dd35379283a8c2544408b6922ebdd315193f2",null),(0,o.A)(d,"40ec096daa3bcb54718558d98dcabbe9e42725ca7f",null),(0,o.A)(c,"602120e49e33be750c274492363c9a5c9dc2e83f3c",null),(0,o.A)(l,"60e3818e0303e036dd90f878bfa9ff4a75d4b3dcc7",null),(0,o.A)(f,"70bcb7a1e738dc94ab657f840a1abc0c8929391a88",null)},1140:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,3219,23)),Promise.resolve().then(t.t.bind(t,4863,23)),Promise.resolve().then(t.t.bind(t,5155,23)),Promise.resolve().then(t.t.bind(t,9350,23)),Promise.resolve().then(t.t.bind(t,6313,23)),Promise.resolve().then(t.t.bind(t,8530,23)),Promise.resolve().then(t.t.bind(t,8921,23))},7524:(e,r,t)=>{Promise.resolve().then(t.t.bind(t,6959,23)),Promise.resolve().then(t.t.bind(t,3875,23)),Promise.resolve().then(t.t.bind(t,8903,23)),Promise.resolve().then(t.t.bind(t,4178,23)),Promise.resolve().then(t.t.bind(t,6013,23)),Promise.resolve().then(t.t.bind(t,7190,23)),Promise.resolve().then(t.t.bind(t,1365,23))},6882:(e,r,t)=>{Promise.resolve().then(t.bind(t,2030))},1386:(e,r,t)=>{Promise.resolve().then(t.bind(t,7626))},6487:()=>{},8335:()=>{},7626:(e,r,t)=>{"use strict";t.d(r,{ThemeProvider:()=>s});var o=t(5512);t(8009);var a=t(3371);function s({children:e,...r}){return(0,o.jsx)(a.N,{...r,children:e})}},9400:(e,r,t)=>{"use strict";t.d(r,{$:()=>c});var o=t(5512),a=t(8009),s=t(2705),n=t(2101),i=t(4195);let d=(0,n.F)("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",{variants:{variant:{default:"bg-primary text-primary-foreground hover:bg-primary/90",destructive:"bg-destructive text-destructive-foreground hover:bg-destructive/90",outline:"border border-input bg-background hover:bg-accent hover:text-accent-foreground",secondary:"bg-secondary text-secondary-foreground hover:bg-secondary/80",ghost:"hover:bg-accent hover:text-accent-foreground",link:"text-primary underline-offset-4 hover:underline"},size:{default:"h-10 px-4 py-2",sm:"h-9 rounded-md px-3",lg:"h-11 rounded-md px-8",icon:"h-10 w-10"}},defaultVariants:{variant:"default",size:"default"}}),c=a.forwardRef(({className:e,variant:r,size:t,asChild:a=!1,...n},c)=>{let l=a?s.DX:"button";return(0,o.jsx)(l,{className:(0,i.cn)(d({variant:r,size:t,className:e})),ref:c,...n})});c.displayName="Button"},4590:(e,r,t)=>{"use strict";t.d(r,{Wu:()=>c,ZB:()=>d,Zp:()=>n,aR:()=>i,wL:()=>l});var o=t(5512),a=t(8009),s=t(4195);let n=a.forwardRef(({className:e,...r},t)=>(0,o.jsx)("div",{ref:t,className:(0,s.cn)("rounded-lg border bg-card text-card-foreground shadow-sm",e),...r}));n.displayName="Card";let i=a.forwardRef(({className:e,...r},t)=>(0,o.jsx)("div",{ref:t,className:(0,s.cn)("flex flex-col space-y-1.5 p-6",e),...r}));i.displayName="CardHeader";let d=a.forwardRef(({className:e,...r},t)=>(0,o.jsx)("div",{ref:t,className:(0,s.cn)("text-2xl font-semibold leading-none tracking-tight",e),...r}));d.displayName="CardTitle",a.forwardRef(({className:e,...r},t)=>(0,o.jsx)("div",{ref:t,className:(0,s.cn)("text-sm text-muted-foreground",e),...r})).displayName="CardDescription";let c=a.forwardRef(({className:e,...r},t)=>(0,o.jsx)("div",{ref:t,className:(0,s.cn)("p-6 pt-0",e),...r}));c.displayName="CardContent";let l=a.forwardRef(({className:e,...r},t)=>(0,o.jsx)("div",{ref:t,className:(0,s.cn)("flex items-center p-6 pt-0",e),...r}));l.displayName="CardFooter"},2373:(e,r,t)=>{"use strict";t.d(r,{lV:()=>f,MJ:()=>v,Rr:()=>x,zB:()=>u,eI:()=>p,lR:()=>g,C5:()=>y});var o=t(5512),a=t(8009),s=t(2705),n=t(6868),i=t(4195),d=t(2405);let c=(0,t(2101).F)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"),l=a.forwardRef(({className:e,...r},t)=>(0,o.jsx)(d.b,{ref:t,className:(0,i.cn)(c(),e),...r}));l.displayName=d.b.displayName;let f=n.Op,m=a.createContext({}),u=({...e})=>(0,o.jsx)(m.Provider,{value:{name:e.name},children:(0,o.jsx)(n.xI,{...e})}),b=()=>{let e=a.useContext(m),r=a.useContext(h),{getFieldState:t,formState:o}=(0,n.xW)(),s=t(e.name,o);if(!e)throw Error("useFormField should be used within <FormField>");let{id:i}=r;return{id:i,name:e.name,formItemId:`${i}-form-item`,formDescriptionId:`${i}-form-item-description`,formMessageId:`${i}-form-item-message`,...s}},h=a.createContext({}),p=a.forwardRef(({className:e,...r},t)=>{let s=a.useId();return(0,o.jsx)(h.Provider,{value:{id:s},children:(0,o.jsx)("div",{ref:t,className:(0,i.cn)("space-y-2",e),...r})})});p.displayName="FormItem";let g=a.forwardRef(({className:e,...r},t)=>{let{error:a,formItemId:s}=b();return(0,o.jsx)(l,{ref:t,className:(0,i.cn)(a&&"text-destructive",e),htmlFor:s,...r})});g.displayName="FormLabel";let v=a.forwardRef(({...e},r)=>{let{error:t,formItemId:a,formDescriptionId:n,formMessageId:i}=b();return(0,o.jsx)(s.DX,{ref:r,id:a,"aria-describedby":t?`${n} ${i}`:`${n}`,"aria-invalid":!!t,...e})});v.displayName="FormControl";let x=a.forwardRef(({className:e,...r},t)=>{let{formDescriptionId:a}=b();return(0,o.jsx)("p",{ref:t,id:a,className:(0,i.cn)("text-sm text-muted-foreground",e),...r})});x.displayName="FormDescription";let y=a.forwardRef(({className:e,children:r,...t},a)=>{let{error:s,formMessageId:n}=b(),d=s?String(s?.message):r;return d?(0,o.jsx)("p",{ref:a,id:n,className:(0,i.cn)("text-sm font-medium text-destructive",e),...t,children:d}):null});y.displayName="FormMessage"},7722:(e,r,t)=>{"use strict";t.d(r,{p:()=>n});var o=t(5512),a=t(8009),s=t(4195);let n=a.forwardRef(({className:e,type:r,...t},a)=>(0,o.jsx)("input",{type:r,className:(0,s.cn)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",e),ref:a,...t}));n.displayName="Input"},4195:(e,r,t)=>{"use strict";t.d(r,{cn:()=>s});var o=t(2281),a=t(4805);function s(...e){return(0,a.QP)((0,o.$)(e))}},9192:(e,r,t)=>{"use strict";t.d(r,{E$:()=>a,X5:()=>s,zK:()=>n});var o=t(6131);let a=o.z.object({title:o.z.string().min(2).max(50),completed:o.z.boolean()}),s=o.z.object({username:o.z.string().min(1,"Username is required"),password:o.z.string().min(1,"Password is required")}),n=o.z.object({username:o.z.string().min(5,"min 5 characters").max(50,"max 50 characters"),password:o.z.string().min(5,"min 5 characters").max(50,"max 50 characters")})},1354:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>l,metadata:()=>c});var o=t(2740),a=t(2067),s=t.n(a),n=t(4738),i=t.n(n),d=t(2030);t(1135);let c={title:"Create Next App",description:"Generated by create next app"};function l({children:e}){return(0,o.jsx)("html",{lang:"en",suppressHydrationWarning:!0,children:(0,o.jsx)("body",{className:`${s().variable} ${i().variable} antialiased`,children:(0,o.jsx)(d.ThemeProvider,{attribute:"class",defaultTheme:"system",enableSystem:!0,disableTransitionOnChange:!0,children:e})})})}},1154:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var o=t(2740);function a(){return(0,o.jsx)("div",{className:"flex items-center justify-center h-screen",children:(0,o.jsx)("p",{className:"text-lg font-semibold text-center",children:"Loading..."})})}},2030:(e,r,t)=>{"use strict";t.d(r,{ThemeProvider:()=>o});let o=(0,t(6760).registerClientReference)(function(){throw Error("Attempted to call ThemeProvider() from the server but ThemeProvider is on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/Users/uauario/Desktop/Programacion/go-tutorial/client/src/components/theme-provider.tsx","ThemeProvider")},440:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>a});var o=t(8077);let a=async e=>[{type:"image/x-icon",sizes:"16x16",url:(0,o.fillMetadataSegment)(".",await e.params,"favicon.ico")+""}]},1135:()=>{}};