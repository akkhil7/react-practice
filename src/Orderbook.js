import React, { useEffect, useRef, useState } from "react";

function Orderbook() {
  const [state, _setState] = useState({
    asks: [],
    bids: [],
  });
  const [loading, setLoading] = useState(false);
  const stateRef = useRef(state);

  const setState = (value) => {
    stateRef.current = value;
    _setState(value);
  };

  const handleData = ({ type = "", asks = [], bids = [], changes = [] }) => {
    switch (type) {
      case "snapshot":
        console.log("snapshot");
        setState({
          asks: [...stateRef.current.asks, ...asks],
          bids: [...stateRef.current.bids, ...bids],
        });
        console.log("gonna set loading to false");
        setLoading(false);
        break;
      case "l2update":
        let newBids = [];
        let newAsks = [];
        changes.forEach((change) => {
          const updatedArr = handleOrderChange(change);
          newBids = change[0] === "buy" ? updatedArr : stateRef.current.bids;
          newAsks = change[0] !== "buy" ? updatedArr : stateRef.current.asks;
        });

        setState({
          asks: newAsks,
          bids: newBids,
        });
        break;
      default:
        console.log(type);
        break;
    }
  };

  const handleOrderChange = (change) => {
    let [saleType, price, size] = change;

    // Inherit previous state
    let updateArr =
      saleType === "buy"
        ? [...stateRef.current.bids]
        : [...stateRef.current.asks];
    const index = updateArr.findIndex((order) => {
      return parseFloat(order[0]) === parseFloat(price);
    });

    // If order is found in array, then update size or remove it
    if (index > 0) {
      // If size is not zero, then update size since its changed
      if (parseFloat(size) > 0) {
        console.log("update size");
        updateArr[index] = [price, size];
        // If update size is zero then just remove order node
      } else {
        console.log("remove order");
        updateArr.splice(index, 1);
      }
      // If no index is found then we need to add it
    } else {
      // Size should be great than zero but just in case
      console.log("add new order");
      if (parseFloat(size) > 0) {
        updateArr = [...updateArr, [price, size]];
      }
    }
    console.log(saleType, updateArr.length);

    return updateArr;
  };

  useEffect(() => {
    setLoading(true);
    const ws = new WebSocket("wss://ws-feed.pro.coinbase.com");
    const msg = {
      type: "subscribe",
      product_ids: ["ETH-USD"],
      channels: ["level2"],
    };

    ws.onopen = () => {
      ws.send(JSON.stringify(msg));
    };

    ws.onmessage = function ({ data }) {
      const response = JSON.parse(data);
      handleData(response);
    };

    return () => {
      console.log("un subscribe");
      if (ws.OPEN && !ws.CONNECTING) {
        ws.send(JSON.stringify({ ...msg, type: "unsubscribe" }));
        ws.close();
      }
    };
  }, []);

  const renderOrders = () => {
    return (
      <>
        <table className="order-table">
          <thead className="order-header">
            <tr>
              <th>Market size</th>
              <th>Price (USD)</th>
              <th>My size</th>
            </tr>
          </thead>
          <tbody className="order-table">
            {state.bids.slice(0, 50).map((order, index) => (
              <tr className="Orderbook__book__item" key={index}>
                <td className="column">{parseFloat(order[1]).toFixed(4)}</td>
                <td className="column">
                  <span className="price bids">
                    {parseFloat(order[0]).toFixed(2)}
                  </span>
                </td>
                <td className="column">-</td>
              </tr>
            ))}
          </tbody>
          <tbody className="order-table">
            {state.asks.slice(0, 50).map((order, index) => (
              <tr className="Orderbook__book__item" key={index}>
                <td className="column">{parseFloat(order[1]).toFixed(4)}</td>
                <td className="column">
                  <span className="price asks">
                    {parseFloat(order[0]).toFixed(2)}
                  </span>
                </td>
                <td className="column">-</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };

  if (loading) return <h2>Loading</h2>;

  return <div className="order-book">{renderOrders()}</div>;
}

export default React.memo(Orderbook);
