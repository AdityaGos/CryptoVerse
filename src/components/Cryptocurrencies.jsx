import React, { useEffect,useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { Card, Row, Col, Input } from "antd";

import { useGetCryptosQuery } from "../services/cryptoApi";
//     passing a props(parameter) to the function
const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;
  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setsearchTerm] = useState('');

  useEffect(() => {
   const filteredData=cryptosList?.data?.coins.filter((coin)=>coin.name.toLowerCase().includes(searchTerm.toLowerCase())) 
    setCryptos(filteredData)
  },[cryptosList,searchTerm]);
  // This funtion will be executed whenerver this value will chane 
  


  // variable is not reactive
  // it has to re render the variable when it changes
  if (isFetching) return 'Loading';
  console.log(cryptos);
  return (
    <>
    {!simplified  && (
    <div className="search-crypto">
      <Input  autoFocus style={{borderRadius:10}}placeholder="Search Cryptocurrency" onChange={(e)=>setsearchTerm(e.target.value)}/>
    </div>  
    )}
    
      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptos?.map((currency) => (
          <Col xs={24} s={12} lg={6} className="crypto-card" key={currency.rank}>
            <Link to={`/crypto/${currency.uuid}`}>
              <Card style={{borderRadius:18}}
                title={`${currency.rank}. ${currency.name}`}
                extra={<img className="crypto-image" src={currency.iconUrl} />}
                hoverable
              >
                <p> Price: {`$${millify(currency.price)}`}</p>
                <p> MarketCap:{millify(currency.marketCap)}</p>
                <p> Daily Change:{millify(currency.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
