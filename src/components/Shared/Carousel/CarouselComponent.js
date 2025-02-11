import React, { useRef, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { Image } from 'react-native-elements';
import { styles } from "./CarouselComponent.styles";

export function CarouselComponent(props) {
    const { arrayImages, width, height, hideDots } = props;
    const scrollRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const handleScroll = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const index = Math.round(scrollPosition / width);
        setActiveIndex(index);
    };

    const pagination = () => (
        <View style={styles.dotsContainer}>
            {arrayImages.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        { backgroundColor: activeIndex === index ? '#000' : '#ccc' }
                    ]}
                />
            ))}
        </View>
    );

    return (
        <View style={styles.content}>
            <ScrollView
                ref={scrollRef}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={200}
            >
                {arrayImages.map((image, index) => (
                    <Image
                        key={index}
                        source={{ uri: image }}
                        style={{ width, height }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>

            {!hideDots && pagination()}
        </View>
    );
}
