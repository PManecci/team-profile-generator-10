const Intern = require('../lib/Intern');

test('creates an object for Intern', () => {
    const intern = new Intern('Patty', 12345, 'PManecci@gmail.com', 'UCF');

    expect(intern.school).toEqual(expect.any(String));
});

test('override role to intern', () => {
    const intern = new Intern('Patty', 12345, 'PManecci@gmail.com', 'UCF');

    expect(intern.getRole()).toEqual("Intern");
});