# MobX

## 1. 介绍

### 1.1. 原理
React的render是 *状态* 转化为树状结构的渲染组件的方法  
而MobX提供了一种存储，更新 *状态* 的方法  
React 和 MobX都在优化着软件开发中相同的问题。  
React 使用的方法是让**虚拟DOM**来减少繁琐而沉重的DOM变化。  
而MobX则通过一个虚拟的**状态依赖图表**来让react组件和应用状态同步化来减少不必要的状态导致组件更新

###  1.2. 安装
MobX：

	npm install mobx --save

React bindings：

	npm install mobx-react --save

### 1.3. 要点
MobX看起来很复杂的样子，其实是用它只需要三步

1. 定义你的状态，让它们成为观察者(observable)
存储状态(Store state)可以是任何的数据结构，随你定义为：对象，数组，类，循环结构，引用都没所谓。但需要记住一点，就是：随着时间的变化，用MobX 去把它们定义成观察者(observable)
```javascript
import {observable} from 'mobx'
let appState = observable({
    timer: 0
})
```

2. 我们不需要让appState去观察什么。你现在就能创建视图(view)，每当appState的相关数据发生变化的时候，就会自动更新。MobX会采用最优的方式去更新你的视图。以下有一个例子来说明如何使用，其中使用了ES6／ES7的语法（当然MobX也是支持ES5），**[代码中@的意义](http://es6.ruanyifeng.com/#docs/decorator)**
```javascript
import {observer} from 'mobx-react';
@observer
class TimerView extends React.Component {
    render() {
        return (<button onClick={this.onReset.bind(this)}>
                Seconds passed: {this.props.appState.timer}
            </button>);
    }
    onReset () {
	    //appState.resetTimer会在下一节完成
        this.props.appState.resetTimer();
    }
};
React.render(<TimerView appState={appState} />, document.body);
```

3.  修改状态
第三节要说的是修改状态。MobX和其他框架不同，它不会要求你去做什么事情，它只是帮助你去做简单的事情
```javascript
appState.resetTimer = action(function reset() {
    appState.timer = 0;
});
setInterval(action(function tick() {
    appState.timer += 1;
}), 1000);
```
其中action包装用法只能在strict模式下使用，请记得在你的javascript文件头写上：'use strict'。


## 2. API
从上面的例子可以看到，MobX的API其实不多：observable, computed, reactions, actions

### 2.1. observable(value)
其中的value可以是JS原定的数据结构，引用，对象，数组，ES6的[map](http://es6.ruanyifeng.com/#docs/set-map)
1. 如果value是一个map的话，则需要使用一个调节器（modifier）**asMap**来使用。这时候会返回一个**Observable Map**
2. 如果是一个数组，返回**Observable Array**
3. 如果是一个没有属性的对象，则返回一个**Observable Object**
4. 如果是一个有属性的对象，JS原有的数据结构，函数等，返回一个** Boxed Observable**。MobX不会自动让一个有属性的对象成为观察者。这是这个有属性的对象的构造函数应该做的事情，你可以使用extendObservable在它的构造函数里面，或者在它的类使用@observable去定义。  

以下是一些例子：
```javascript
const map = observable(asMap({ key: "value"}));
map.set("key", "new value");

const list = observable([1, 2, 4]);
list[2] = 3;

const person = observable({
    firstName: "Clive Staples",
    lastName: "Lewis"
});
person.firstName = "C.S.";

const temperature = observable(20);
temperature.set(25);
```

### 2.2. @observable
```javascript
import {observable} from "mobx";
class OrderLine {
    @observable price:number = 0;
    @observable amount:number = 1;
    constructor(price) {
        this.price = price;
    }
	//这里在下一节会说到
    @computed get total() {
        return this.price * this.amount;
    }
}
const line = new OrderLine();
console.log("price" in line); // true
//hasOwnProperty：判断一个对象是否有你给出名称的属性或对象。需要注意，此方法无法检查该对象的原型链中是否具有该属性
console.log(line.hasOwnProperty("price")); //false
```
如果你的环境不支持ES6/7的语法的话，其实@observable key = value;  只是extendObservable(this, { key: value })的语法糖。因此在ES5环境下你也能使用

### 2.3. (@)computed
Computed values 就像一个算术公式一样去从现有的状态或其他值去计算出需要的值。计算的耗费是不可低估的。Computed尽可能帮你减少其中的耗费。它们是高度优化的，请把它用在可能用到的地方。

不要混淆下一节说到的autorun。虽然他们都是被动调用的表达式。但是……  
Computed使用情况：如果你需要产生一个有观察者(observers)参数计算的新的值的时候  
autorun使用情况：你不想产生一个新的值就想达到一个新的效果/功能。就像是打log或者进行网络请求  
Computed values是自动帮你从你的状态(state)值和其他计算辅助值来计算的。MobX做了很多的优化。当参与计算的值没有发生改变，Computed是不会重新运行。如果参与计算的值没有被使用，Computed values是暂停的。

如果Computed values不再是观察者(observed)，那么在UI上也会把它除掉，MobX能自动做垃圾回收。autorun则需要你自己手动去处理。如果参与计算的值不再被使用，是不会缓存Computed的，所以重新计算是需要的。这个是最理想的默认情况。如果你想保留，可以了解一下keepalive和observe。

例子1:	在2.2的例子。@computed get

例子2: @computed set
```javascript
class Foo {
    @observable length: 2,
    @computed get squared() {
        return this.length * this.length;
    }
    set squared(value) { //this is automatically an action, no annotation necessary
        this.length = Math.sqrt(value);
    }
}
```
**需要注意的是：setter并非用于直接改变参数计算的值,如例子中的length。而是作为一个逆推导。**

### 2.4. Autorun
Autorun是用在一些你想要产生一个不用观察者参与的被动调用函数里面。当autorun被使用的时候，一旦依赖项发生变化，autorun提供的函数就会被执行。与之相反的是，computed提供的函数只会在他有自己的观察员(observers)的时候才会评估是否重新执行，否则它的值被认为是无用的。  

根据这些经验：如果你需要一个自动运行但却不会产生任何新的值的结果的函数，那么请使用Autorun。其他情况请使用computed。Autorun只是作用于如果达到某个效果或者功能，而不是计算某些值。如果有一个字符串作为第一个参数存入Autorun，那么它将成为一个调试名称。
```javascript
var numbers = observable([1,2,3]);
var sum = computed(() => numbers.reduce((a, b) => a + b, 0));

var disposer = autorun(() => console.log(sum.get()));
// prints '6'
numbers.push(4);
// prints '10'
```

### 2.5. @observer

1. observer 函数/修饰器用于react组件。通过*mobx-react*依赖包来提供。它通过mobx.autorun来包装了组件的render函数，以确保组件的render函数在任何数据的更改是强制重新渲染
```javascript
import {observer} from "mobx-react";
var timerData = observable({
    secondsPassed: 0
});
setInterval(() => {
    timerData.secondsPassed++;
}, 1000);
@observer class Timer extends React.Component {
    render() {
        return (<span>Seconds passed: { this.props.timerData.secondsPassed } </span> )
    }
});
React.render(<Timer timerData={timerData} />, document.body);
```
tips: 如果还有其他的decorators一起或者高阶组件的存在，请确保observer为最内层（优先应用）的修饰器。否则它可能无法工作。如果你只在ES5的环境下工作：其实observer不过是**observer(class Timer ... { })** 的语法糖。

2. 难点—组件中相关值的引用：
MobX能做的事情很多，但是它却不能把原始的值变成观察者（尽管可以通过包裹这个值来返回一个boxed observables的对象）。所以观察者不是这个原始的值，而是返回后的对象的属性值。修改一个刚才的例子：
```javascript
React.render(<Timer timerData={timerData.secondsPassed} />, document.body)
```
这时候程序并不会工作了。传入组件的只是timerData里面secondsPassed的当前值。在组件里面，它是不可变的。

3. 把你的组件内部状态变成可观察的
和普通的类一样，你可以在你的组件使用@observable修饰器。这意味着你的组件拥有了一个内部state，而且它不需要使用react内部提供的繁琐的setState机制。这个内部state能调起render函数，但是却不能准确调起React的生命周期函数，例如：componentShouldUpdate / componentWillUpdate。如果你想要这些，最好使用react提供的API来创建state。当然也可以这样写
```javascript
import {observer} from "mobx-react"
import {observable} from "mobx"
@observer class Timer extends React.Component {
    @observable secondsPassed = 0
    componentWillMount() {
        setInterval(() => {
            this.secondsPassed++
        }, 1000)
    }
    render() {
        return (<span>Seconds passed: { this.secondsPassed } </span> )
    }
})
React.render(<Timer />, document.body)
```

4. 连接observer和stores
mobx-react提供了**Provider**组件让你可以把传递下来的stores作用在react提供的上下文机制。通过连接这些stores和observer，这些observer会成为组件的属性来使用。
```javascript
const colors = observable({
   foreground: '#000',
   background: '#fff'
});
const App = () =>
  <Provider colors={colors}>
     <app stuff... />
  </Provider>;
const Button = observer(["colors"], ({ colors, label, onClick }) =>
  <button style={{
      color: colors.foreground,
      backgroundColor: colors.background
    }}
    onClick={onClick}
  >{label}<button>
);
// later..
colors.foreground = 'blue';
// all buttons updated
```

5. componentWillReact
React 的组件总是从新的堆栈去渲染。因此让它它很难判断一个组件是否需要重新渲染。在mobx-react里面，你可以使用重新定义的生命周期componentWillReact。它只会在观察者发生变化的时候才重新渲染。
```javascript
import {observer} from "mobx-react";
@observer class TodoView extends React.Component {
    componentWillReact() {
        console.log("I will re-render, since the todo has changed!");
    }
    render() {
        return <div>this.props.todo.title</div>;
    }
}
```
componentWillReact没有任何参数，而且不会在render初始化之前执行（componentWillMount的区别)。而当接收新的属性或者setState之后，它会被调用。

### 2.6. action

1. 任何应用程序都有操作（action）。action是任何改变状态的事物。使用MobX，您可以通过标记它们在您的代码中显式地显示您的操作（action）。它会更好的帮助你组织你的代码。建议将它们用于修改可观察量或具有副作用的任何函数中。  
需要注意的是：action是用在*strict mode* 中的
```javascript
action(fn)
action(name, fn)
@action classMethod() {}
@action(name) classMethod () {}
@action boundClassMethod = (args) => { body }
@action(name) boundClassMethod = (args) => { body }
@action.bound classMethod() {}
@action.bound(function() {})
```
```javascript
@action createRandomContact() {
	this.pendingRequestCount++;
	superagent
		 .get('https://randomuser.me/api/')
		 .set('Accept', 'application/json')
		 .end(action("createRandomContact-callback", (error, results) => {
				 if (error) console.error(error)
				 else {
					 const data = JSON.parse(results.text).results[0];
					 const contact = new Contact(this, data.dob, data.name, data.login.username, data.picture)
					 contact.addTag('random-user');
					 this.contacts.push(contact);
					 this.pendingRequestCount--;
				 }
		}
))}
```

2. action 仅仅作用于当前运行的函数，而不能作用于当前函数调用的函数。这意味着在一些定时器或者网络请求，异步处理的情况下，它们的回调函数无法对状态做成改变。这些回调函数都应该有action包裹，如果例子里面的 *createRandomContact-callback* 一样。但是，如果你使用了async / await的话，最好的方式应该是使用 **runInAction** 来让它变得更加简单
```javascript
@action /*optional*/ updateDocument = async () => {
    const data = await fetchDataFromUrl();
    /* required in strict mode to be allowed to update state: */
    runInAction("update state after fetching data", () => {
        this.data.replace(data);
        this.isSaving = true;
    })
}
```

3. Bound actions  
目前看到的actions都是遵循在javascript中绑定的正常规则，但是在MobX 3引入了action.bound来自动绑定actions到目标对象上。和action的使用不一样，不需要一个名字参数。它的名称始终基于绑定到属性的操作上。需要注意的是，在箭头函数上不要这样使用，因为箭头函数已经绑定了上下文，不能在重新更改上下文
```javascript
class Ticker {
    @observable this.tick = 0

    @action.bound
    increment() {
        this.tick++ // 'this' will always be correct
    }
}
const ticker = new Ticker()
setInterval(ticker.increment, 1000)
```
