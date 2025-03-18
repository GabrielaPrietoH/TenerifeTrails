import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10, 
    padding: 15, 
    marginHorizontal: 10, 
    marginVertical: 5,
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexDirection: 'row', 
    alignItems: 'center', 
  },
  imageWrapper: {
    width: 90, 
    height: 90, 
    borderRadius: 10, 
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15, 
  },
  image: {
    width: 80, 
    height: 80, 
    borderRadius: 8,
  },
  infoContainer: {
    flex: 1, 
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333', 
  },
  address: {
    color: '#666', 
    fontSize: 14,
    marginTop: 5,
  },
  description: {
    color: '#666',
    fontSize: 14,
    marginTop: 5,
    lineHeight: 18,
    flexShrink: 1, 
  },
  separator: {
    height: 3, 
  },
});