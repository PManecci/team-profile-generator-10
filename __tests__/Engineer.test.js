const Engineer = require('../lib/Engineer');

test('creates an object for Engineer', () => {
    const engineer = new Engineer('Patty', 12345, 'PManecci@gmail.com', 'PManecci');

    expect(engineer.github).toEqual(expect.any(String));
});

test('override role to engineer', () => {
    const engineer = new Engineer('Patty', 12345, 'PManecci@gmail.com', 'PManecci');

    expect(engineer.getRole()).toEqual("Engineer");
});