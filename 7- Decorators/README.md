# Typescript Decorators

## What is Decorators ?

**_TS Docs:_**

> With the introduction of Classes in TypeScript and ES6, there now exist certain scenarios that require additional features to support **_annotating or modifying classes and class members_**. Decorators provide a way to add both annotations and a meta-programming syntax for class declarations and members.

> A Decorator is a special kind of declaration that can be attached to a class declaration, method, accessor, property, or parameter. Decorators use the form `@expression`, where expression must evaluate to a function that will be called at runtime with information about the decorated declaration.

**_In short A Decorator is a design pattern in programming in which you wrap something to change its behavior._**

This indicates that it supports Meta programming syntax .. but, what is Meta Programming ?

### _Meta programming_

It allows you to write code that can analyze other code, access and inspect objects, and dynamically modify their behavior without changing the implementation of the object itself.

### _Decorators Usages_

- Adding additional behavior to a class or its members.

- Implementing dependency injection.

- Modifying third-party libraries without having to change the implementation of the library itself.

### _Decorators Syntax_

A decorator is a function that is called with a specific set of parameters. These parameters are contain information about the `class`, `method`, `property` or `parameter` to which the decorator has been applied.

_The number of parameters, and their types, determine where a decorator can be applied_.

**_example (class decorator):_**

```typescript
function logClassName(constructor: Function) {
  console.log(`Class name: ${constructor.name}`);
}

@logClassName
class ApiService {}
// [LOG] : "Class name: ApiService"
// Note @logClassName execute without create a new instance from this class.
```

`🔥 NOTE 🔥` **_Decorators are executed when they are applied to a class, and they are executed immediately when the class is defined. This means that the decorators are invoked at the time the class is declared, without the need to create instances of the class. They are executed as part of the class definition process._**

To delay the execution of decorators until instances of the class are created, you can use _decorator factories_.

**_Decorator factories_** : are functions that return the actual decorator function. By using a decorator factory, you can control when the decorator is applied and executed.

```typescript
function myDecoratorFactory() {
  return function (target: any) {
    // Decorator logic here
    console.log("Decorator executed");
  };
}

@myDecoratorFactory()
class MyClass {
  // Class implementation
}

const instance = new MyClass(); // Decorator executed
```

<hr/>

## Types Of Decorators ?

You can see the types from the documentation:

- [Class Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#class-decorators): Applied to classes and modify or extend their behavior. They receive the constructor function of the class as their target.

- [Method Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#method-decorators): Applied to methods within a class and can be used to modify their behavior or add additional functionality. They receive the prototype of the class, the name of the method, and a property descriptor as their target.

- [Accessor Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#accessor-decorators) Applied to the Property Descriptor for the accessor and can be used to observe, modify, or replace an accessor’s definitions. They receive the prototype of the class, the name of the method, and a property descriptor as their target.

- [Property Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#property-decorators): Applied to class properties and allow you to modify or add behavior to those properties. They receive the prototype of the class and the name of the property as their target.

- [Parameter Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html#parameter-decorators): Applied to the parameters of a method or constructor and can be used to modify or provide additional information about those parameters. They receive the prototype of the class, the name of the method or constructor, and the index of the parameter as their target.

<hr/>

#### Resources

- [https://dev.to/siddharthshyniben/understanding-typescript-decorators-3ifc](https://dev.to/siddharthshyniben/understanding-typescript-decorators-3ifc)
- [https://www.codemotion.com/magazine/backend/understanding-the-role-of-decorators-in-typescript/](https://www.codemotion.com/magazine/backend/understanding-the-role-of-decorators-in-typescript/)
