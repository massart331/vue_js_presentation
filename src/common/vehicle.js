function vehicleLoverPrice(costs) {
  let lowest = costs.data.length ? costs.data[0].price : 0;
  costs.data.forEach(item => {
    lowest = item.price < lowest ? item.price : lowest
  });
  return lowest
}

export {vehicleLoverPrice}