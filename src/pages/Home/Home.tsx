import React, { useState } from "react";
import { Input, List, Button } from "antd";
import axios from "axios";

const { Search } = Input;

type SearchItem = {
  name: string;
  resources?: string;
  title?: string;
  [key: string]: any;
};

const Home = () => {
  const [selectedItem, setSelectedItem] = useState<SearchItem | null>(
    null
  );
  const [searchResults, setSearchResults] = useState<
    Record<string, SearchItem>
  >({});

  const resources = [
    "films",
    "people",
    "planets",
    "species",
    "starships",
    "vehicles",
  ];

  function modify(result: string, query: string) {
    var re = new RegExp(
      query
        .split("")
        .map(function (x) {
          return x.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
        })
        .join("[-\\s.]*"),
      "ig"
    );
    return result.replace(re, "<b>$&</b>");
  }

  const requestAPI = async (query: string) => {
    if (!query) return;

    resources.forEach(async (resource) => {
      const res = await axios.get(
        `https://swapi.dev/api/${resource}?search=${query}`
      );
      if (res.data.results.length > 0) {
        const result: Record<string, any> = {};
        res.data.results.forEach((item: SearchItem) => {
          item.searchTitle = modify(item.name, query);
          result[item.name] = { ...item, resource };
        });
        console.log(result);
        setSearchResults({
          ...searchResults,
          ...result,
        });
      }
    });
  };

  const onSearchChange = (e: { target: { value: string } }) => {
    setSearchResults({});
    const value = e.target.value;
    if (value.length >= 3) {
      requestAPI(value);
    }
    if (!value) setSearchResults({});
  };

  return (
    <div className="Home">
      <Search
        onChange={onSearchChange}
        placeholder="input search text"
        allowClear
        enterButton="Search"
        size="large"
        onSearch={requestAPI}
      />
      {selectedItem ? (
        <div className="search-details">
          <br />
          <Button onClick={() => setSelectedItem(null)}>
            Go Back
          </Button>
          <br />
          <br />
          <h3>You selected: {selectedItem.name}</h3>
          <div className="details-item-container">
            {Object.keys(selectedItem).map(
              (key) =>
                selectedItem[key].length > 0 && (
                  <div className="details-item" key={key}>
                    <b>{key}</b>:{" "}
                    {Array.isArray(selectedItem[key]) ? (
                      selectedItem[key].map((i: string) => (
                        <li>
                          <a href={i}>{i}</a>
                        </li>
                      ))
                    ) : (
                      <>{selectedItem[key]}</>
                    )}
                  </div>
                )
            )}
          </div>
        </div>
      ) : (
        <>
          <br />
          <br />

          <List
            itemLayout="horizontal"
            dataSource={Object.values(searchResults)}
            renderItem={(item) => (
              <List.Item onClick={() => setSelectedItem(item)}>
                <List.Item.Meta
                  title={
                    <div
                      className="search-result-title"
                      dangerouslySetInnerHTML={{
                        __html: item.searchTitle,
                      }}
                    ></div>
                  }
                  description={
                    <div className="search-result-description">
                      {item.resource}
                    </div>
                  }
                />
              </List.Item>
            )}
          />
        </>
      )}
    </div>
  );
};

export default Home;
