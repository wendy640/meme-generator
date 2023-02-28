import React,{useEffect, useState} from 'react'


const Meme = () => {
	// const [memeimage, setMemeimage] = useState('http://i.imgflip.com/1bij.jpg')
	const [meme, setMeme] = useState({
		topText: '',
		bottomText: '',
		randomImage: 'http://i.imgflip.com/1bij.jpg'
	})
	const [allMeme, setAllMeme] = useState([])
	/** useEffect(() => {
		fetch('https://api.imgflip.com/get_memes')
			.then((res) => res.json())
			.then((data) => setAllMeme(data.data.memes))
	})
	
    useEffect takes a function as its parameter. If that function
    returns something, it needs to be a cleanup function. Otherwise,
    it should return nothing. If we make it an async function, it
    automatically retuns a promise instead of a function or nothing.
    Therefore, if you want to use async operations inside of useEffect,
    you need to define the function separately inside of the callback
    function, as seen below:
    */

	useEffect(() => {
		async function getMemes() {
			const res = await fetch('https://api.imgflip.com/get_memes')
			const data = await res.json()
			setAllMeme(data.data.memes)
		}
		getMemes()
	}, [])

	let url
	const handleClick = () => {
		const randomMeme = [Math.floor(Math.random() * allMeme.length)]
		url = allMeme[randomMeme].url
		setMeme((prevmeme) => ({
			...prevmeme,
			randomImage: url
		}))
		console.log(url)
	}
	function handleChange(event) {
		const { name, value } = event.target
		setMeme((prevText) => ({
			...prevText,
			[name]: value
		}))
	}
	return (
		<main>
			<div className="form">
				<input
					type="text"
					placeholder="Top text"
					className="form-input"
					name="topText"
					value={meme.topText}
					onChange={handleChange}
				/>
				<input
					type="text"
					placeholder="Bottom text"
					className="form-input"
					name="bottomText"
					value={meme.bottomText}
					onChange={handleChange}
				/>
				<button className="form-button" onClick={() => handleClick()}>
					Get a new meme image 🖼
				</button>
			</div>
			<div className="meme">
				<img src={meme.randomImage} alt="" className="meme--image" />
				<h2 className="meme--text top">{meme.topText}</h2>
				<h2 className="meme--text bottom">{meme.bottomText}</h2>
			</div>
		</main>
	)
}

export default Meme
