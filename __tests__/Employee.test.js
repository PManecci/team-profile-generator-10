const Employee = require('../lib/Employee');

test('creates an employee object', () => {
    const employee = new Employee('Patty', 12345, 'PManecci@Gmail.com');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(Number));
    expect(employee.email).toEqual(expect.any(String));
});

test('gets employee name', () => {
    const employee = new Employee('Patty', 12345, 'PManecci@Gmail.com');

    expect(employee.getName()).toEqual(expect.any(String));
    console.log(employee.getName());
});

test('gets employee id', () => {
    const employee = new Employee('Patty', 12345, 'PManecci@Gmail.com');

    expect(employee.getID()).toEqual(expect.any(Number));
});

test('gets employee email', () => {
    const employee = new Employee('Patty', 12345, 'PManecci@Gmail.com');

    expect(employee.getEmail()).toEqual(expect.any(String));
});

test('gets employee role', () => {
    const employee = new Employee('Patty', 12345, 'PManecci@Gmail.com');

    expect(employee.getRole()).toEqual("Employee");
});