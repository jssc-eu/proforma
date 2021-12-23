
export default function attachReleaseMetaData (registrationData, orderData) {
  const data = { ...orderData };

  data.line_items = data.line_items.map((item) => {
    const lineitem = registrationData.line_items.find(i => i.release_id === item.release_id);
    item.release = lineitem.release;
    return item;
  });

  return data;
}
