
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { TrailsScreen } from "../screens/Trails/TrailsScreen"
import { AddTrailScreen } from "../screens/Trails/AddTrailScreen";
import { TrailScreen } from '../screens/Trails/TrailScreen';
import { AddReviewTrailScreen } from '../screens/Trails/AddReviewTrailScreen';
import { ReviewScreen } from '../screens/Trails/ReviewsScreen';
import { screen } from "../utils";

const Stack = createNativeStackNavigator();

export function TrailStack() {
   return (
        <Stack.Navigator>
        <Stack.Screen 
        name={screen.trail.trails} 
        component={TrailsScreen}
        options= {{title: "Senderos"}} 
        />
        <Stack.Screen 
        name={screen.trail.addTrail} 
        component={AddTrailScreen}
        options= {{title: "Nuevo Sendero"}} 
        />
        <Stack.Screen 
        name={screen.trail.trail} 
        component={TrailScreen}
        options= {{title: "Sendero"}} 
        />
        <Stack.Screen 
        name={screen.trail.addReviewTrail} 
        component={AddReviewTrailScreen}
        options= {{title: "Nueva Opinión"}} 
        />
       <Stack.Screen
        name={screen.trail.reviews} 
        component={ReviewScreen}
        options={{ title: "Comentarios" }}
      />
        </Stack.Navigator>
   )
}