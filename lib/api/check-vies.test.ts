import checkVIES from './check-vies';

describe('check VIES', () => {
  test('returns promise', () => {
    const value = checkVIES('HU', 'HU25966330');

    expect(value).toBeInstanceOf(Promise);
  });

  test('promise resolve true', async () => {
    const value = await checkVIES('HU', '25966330');

    expect(value).toBe(true);
  });

  test('handle VAT ids with whitespaces', async () => {
    const value = await checkVIES('HU', 'HU 259 663 30');

    expect(value).toBe(true);
  });
  test('handle VAT ids with dashes', async () => {
    let value = await checkVIES('HU', 'HU 259-663-30');

    expect(value).toBe(true);

    value = await checkVIES('AT', 'ATU63611-7-00');

    expect(value).toBe(true);
  });
  test('handle VAT ids with messed up formatting', async () => {
    let value = await checkVIES('HU', 'HU 259-6 63_30');

    expect(value).toBe(true);

    value = await checkVIES('SE', '556797930601');

    expect(value).toBe(true);
  });
});
