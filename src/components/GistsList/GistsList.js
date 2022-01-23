import React, {useCallback, useEffect, useRef, useState} from "react"
import styles from "./styles"
import {Animated, FlatList, View} from "react-native"

//Custom Components
import GistRenderItem from "./GistRenderItem/GistRenderItem"
import gistAPI from "../../api/gistAPI"

//renderItem height constant for getItemLayout
const ITEM_HEIGHT = 100

/**
 * Holds the flatlist and animated image for fetching gists
 * and animating a users avatar on the center of the screen
 * @returns {JSX.Element}
 * @constructor
 */
const GistsList = () => {

	//States for Flatlist
	const [isLoading, setIsLoading] = useState(true)
	const [gists, setGists] = useState([])
	const [page, setPage] = useState(1)

	//states and references for Animated.Image
	const [avatarUrl, setAvatarUrl] = useState(null)
	const opacity = useRef(new Animated.Value(0)).current

	//API call for fetching gists
	const fetchGists = async () => {
		setIsLoading(true)

		try {
			const result = await gistAPI.get("/public", {
				params: {
					page: page,
				},
			})
			const data = await result.data

			setGists(prevGists => [...prevGists, ...data])

		} catch (err) {
			console.log(`Error fetching data from API ${err.message}`)
		}

		setIsLoading(false)
	}

	//Handles flatlists onEndReach property
	//Used to create an infinite scroll
	const onEndReached = () => {
		if (!isLoading) {
			setPage(page + 1)
		}
	}

	//Plays the animation of the image over the screen
	const startAnimation = () => {
		Animated.timing(opacity, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start(() => {
			Animated.timing(opacity, {
				toValue: 0,
				duration: 500,
				useNativeDriver: true,
			}).start(() => {
				setAvatarUrl(null)
			})
		})
	}

	const handleOnPress = (avatar) => {
		//Only accept user input if there is currently no animation playing
		if (!avatarUrl) {
			setAvatarUrl(avatar)
			startAnimation()
		}
	}

	const renderItem = useCallback(({item}) => {
		return <GistRenderItem gist={item} handleOnPress={handleOnPress}/>
	}, [])

	const keyExtractor = useCallback((gist, index) => gist.id + index, [])

	//Pre-defined item layout to boost rendering speed
	const getItemLayout = useCallback((data, index) => ({
		length: ITEM_HEIGHT,
		offset: ITEM_HEIGHT * index,
		index,
	}), [])

	//Initial API call to fetch gists
	useEffect(() => {
		fetchGists()
	}, [])

	//Calls the API if the page number is increased due to onEndReach function call
	useEffect(() => {
		fetchGists()
	}, [page])


	return (
		<View>

			<FlatList
				getItemLayout={getItemLayout}
				contentContainerStyle={styles.list}
				keyExtractor={keyExtractor}
				data={gists}
				renderItem={renderItem}
				onEndReached={onEndReached}
				onEndReachedThreshold={15}
				refreshing={isLoading}
				maxToRenderPerBatch={10}
				windowSize={15}
			/>

			{avatarUrl &&
			<View style={styles.imgContainer}>
				<Animated.Image source={{uri: `${avatarUrl}`}}
								style={[styles.imgAnimated, {opacity: opacity}]}/>
			</View>}
		</View>
	)

}


export default GistsList
