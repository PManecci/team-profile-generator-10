const Manager = require('../lib/Manager');

test('creates an object for Manager', () => {
    const manager = new Manager('Patty', 12345, 'PManecci@gmail.com', 100);

    expect(manager.officeNumber).toEqual(expect.any(Number));
});

test('override role to manager', () => {
    const manager = new Manager('Patty', 12345, 'PManecci@gmail.com', 100);

    expect(manager.getRole()).toEqual("Manager");
});