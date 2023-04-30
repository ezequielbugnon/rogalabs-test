import { getCep } from "../../src/utils/getCep";
import { validateCep } from "../../src/utils/validateCep";

test('test in utils getCep Function erro response', async() => {
    const {data} = await getCep("99999999");
    expect(data.erro).toBe(true);
});

test('test in utils getCep Function response', async() => {
    const {data} = await getCep("59178000");
    expect(data).not.toBe(true);
});

test('test in utils validateCep Function response', async() => {
    const data = await validateCep("59178000");
    expect(data).toBe(true);
});

test('test in utils validateCep Function response', async() => {
    const data = await validateCep("99999999");
    expect(data).toBe(false);
});


