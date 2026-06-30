// import React from "react"
import { useState, useEffect } from "react";

export default function Main() {
  const [meme, setMeme] = useState({
    topText: "something different...",
    bottomText: "Walk into Mordor",
    imageUrl: "http://i.imgflip.com/1bij.jpg",
  });

  const [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    fetch("https://api.imgflip.com/get_memes")
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  function getMemeImage() {
 
  const randomNumber = Math.floor(Math.random() * allMemes.length);
  const chosenMeme = allMemes[randomNumber];
  
  const newMemeUrl = chosenMeme.url;
  const newMemeName = chosenMeme.name; 
console.log(newMemeName)
  
  const words = newMemeName.split(" "); 

  let top = "";
  let bottom = "";

  if (words.length === 1) {
    top = words[0];
    bottom = ""; 
  } else {
    const middleIndex = Math.ceil(words.length / 2);
    top = words.slice(0, middleIndex).join(" ");   
    bottom = words.slice(middleIndex).join(" "); 
  }

  setMeme((prevMeme) => ({
    ...prevMeme,
    imageUrl: newMemeUrl,
    topText: top,
    bottomText: bottom,
  }));
}

  function handleChange(event) {
    const { value, name } = event.currentTarget;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  return (
    <>
      <main>
        <div className="form">
          <label>
            Top Text{" "}
            <input
              type="text"
              placeholder="one does not simply"
              name="topText"
              onChange={handleChange}
              value={meme.topText}
            />
          </label>

          <label>
            Bottom Text{" "}
            <input
              type="text"
              placeholder="walk into mordor"
              name="bottomText"
              value={meme.bottomText}
              onChange={handleChange}
            />
          </label>

          <button onClick={getMemeImage}>Get a new meme image</button>
        </div>

        <div className="meme">
          <img src={meme.imageUrl} alt="" />
          <span className="top">{meme.topText}</span>
          <span className="bottom">{meme.bottomText}</span>
        </div>
      </main>
    </>
  );
}
