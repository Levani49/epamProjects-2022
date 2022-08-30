const {
  compact,
  filter,
  chunk,
  drop,
  take,
  find,
  omit,
  pick,
  pickBy,
  toPairs /* import here */,
} = require("./sum.js");

describe("compact", () => {
  test("should return only truthy values", () => {
    expect(compact([0, 1, false, 2, "", 3])).toEqual([1, 2, 3]);
    expect(compact([0, 1, false, 2, "", 3, true, false])).toEqual([
      1,
      2,
      3,
      true,
    ]);
  });
  test("filter", () => {
    const users = [
      { user: "barney", age: 36, active: true },
      { user: "fred", age: 40, active: false },
    ];
    const fun = (obj) => {
      return !obj.active;
    };
    expect(filter(users, fun)).toEqual([
      { user: "fred", age: 40, active: false },
    ]);
  });

  test("chunk", () => {
    const testIt = chunk(["a", "b", "c", "d"], 2);
    expect(testIt).toEqual([
      ["a", "b"],
      ["c", "d"],
    ]);

    const fun = chunk(["a", "b", "c", "d"]);
    expect(fun).toEqual([["a"], ["b"], ["c"], ["d"]]);
  });
  test("drop", () => {
    const Testing = drop([1, 2, 3]);
    expect(Testing).toEqual([2, 3]);
  });

  test("take", () => {
    const testTake = take([1, 2, 3], 2);
    const testTake1 = take([1, 2, 3]);
    expect(testTake).toEqual([1, 2]);
    expect(testTake1).toEqual([1]);
  });

  test("find", () => {
    const users = [
      { user: "barney", age: 36, active: true },
      { user: "fred", age: 40, active: false },
      { user: "pebbles", age: 1, active: true },
    ];
    const fun = (o) => o.age < 40;
    expect(find(users, fun)).toEqual({ user: "barney", age: 36, active: true });
    expect(find(users, { age: 1, active: true })).toEqual({
      user: "pebbles",
      age: 1,
      active: true,
    });
    expect(find(users, ["active", false])).toEqual({
      user: "fred",
      age: 40,
      active: false,
    });
    expect(find(users, "active")).toEqual({
      user: "barney",
      age: 36,
      active: true,
    });
    expect(find(users, "user.active")).toEqual({
      user: "barney",
      age: 36,
      active: true,
    });
    expect(find(users)).toEqual(undefined);
  });

  test("omit", () => {
    let key = { a: 1, b: "2", c: 3 };
    expect(omit(key, ["a", "c"])).toEqual({ b: "2" });
  });

  test("pick", () => {
    let key = { a: 1, b: "2", c: 3 };
    expect(pick(key, ["a", "c"])).toEqual({ a: 1, c: 3 });
  });

  test("pickBy", () => {
    let key = { a: 1, b: "2", c: 3 };

    function isNumber(value, key) {
      if (typeof value == "number") {
        return value;
      } else {
        return false;
      }
    }
    expect(pickBy(key, isNumber)).toEqual({ a: 1, c: 3 });
  });

  test("toPairs", () => {
    function Foo() {
      this.a = 1;
      this.b = 2;
      this.c = 3;
    }
    expect(toPairs(new Foo())).toEqual([
      ["a", 1],
      ["b", 2],
      ["c", 3],
    ]);
  });
});
