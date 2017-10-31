import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";
import { getAll } from "../data/pets";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      pets: getAll(),
      adoptedPets: [],
      filters: {
        type: "all"
      }
    };
  }

  onAdoptPet = id => {
    this.setState({ adoptedPets: [...this.state.adoptedPets, id] });
  };

  onChangeType = val => {
    this.setState({ filters: { type: val } });
  };

  url = val => {
    if (val === "all") {
      return "/api/pets";
    } else {
      return `/api/pets?type=${val}`;
    }
  };

  onFindPetsClick = () => {
    fetch(this.url(this.state.filters.type))
      .then(resp => resp.json())
      .then(json => {
        this.setState({ pets: json });
      });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                filters={this.state.filters}
                onFindPetsClick={this.onFindPetsClick}
                onChangeType={this.onChangeType}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                adoptedPets={this.state.adoptedPets}
                onAdoptPet={this.onAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
