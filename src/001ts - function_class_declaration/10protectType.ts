/**
 * 保护类型： 保护类型就是一些表达式，确保类型是正确的，保护类型就是能够通过关键字判断出分支中的类型
 *
 *  自定义类型一般是两个类型的变量名字相同，不能够通过成员来判断是不是该类型
 *
 * 自定义保护类型: TS里的类型保护本质上就是一些表达式，他们会在运行时检查类型信息，确保在某个作用域里的类型是符合 预期的
 * 要自定义一个类型保护，只需要简单的为这个类型保护定义一个函数即可，这个函数的返回值是一个类型谓词（propertyName is InterfaceName)
 * 类型谓词的语法为： parameterName is Type 这种类型，其中parameterName必须是当前函数签名里的一个参数
 */

function double(input: string | number | boolean): string | number | boolean {
  // 如果直接调用input. 只能够调用他们三的共同方法valueOf或者是toString方法
  // 通过判断语句来进行类型的保护，确定我们可以调用他们拥有的特定的方法
  switch (typeof input) {
    case "number":
      return input.toFixed(2);
    case "string":
      return input.toLocaleUpperCase();
    case "boolean":
      return input.valueOf();
  }
}

namespace OptionAndUnionSpace {
  // 可选链操作符号 ?.
  const obj = { name: 1, say: () => console.log("say") };
  // obj?.name； 先判断obj是否为null或者undefined，如果是的话就直接返回null或者是undefined，如果不是就尝试去调用obj下的属性name
  // obj?.say()； 同理

  const arr = [23];
  console.log(arr?.[0]); // 如果arr不为null或者undefined，就返回arr[0]

  const fun = (): void => console.log("fun");
  console.log(fun?.()); // 如果fun不为null或者undefined，就调用fun()

  // 可变式的联合类型
  // 就是利用联合类型中的共有字段进行类型保护的一种技巧，相同字段的不同取之就是可辨识的
  interface WarningButton {
    class: "warning";
    text1: "警告";
  }

  interface DangerButton {
    class: "danger";
    text2: "危险";
  }

  type Button = WarningButton | DangerButton;
  function getBtn(button: Button): void {
    if (button.class === "warning") console.log(button.text1);
    else console.log(button.text2);
  }

  interface Bird {
    swing: number;
  }

  interface Dog {
    leg: number;
  }

  const getNumber = (x: Bird | Dog): void => {
    if ("swing" in x) {
      x.swing;
    } else {
      x.leg;
    }
  };
}

// 自定义类型保护
namespace DivideSpace {
  interface Bird {
    legs: number;
    name1: string;
  }

  interface Dog {
    legs: number;
    name2: string;
  }

  // 自定义类型保护
  const isBird = (x: Bird | Dog): x is Bird => {
    return x.legs === 2;
  };

  const getAnimal = (x: Bird | Dog): void => {
    // 自定义类型保护
    if (isBird(x)) console.log("this is a ", x.name1);
    else console.log("this is a ", x.name2);
  };

  const x: Bird = { name1: "Bird", legs: 2 };
  getAnimal(x);
}
