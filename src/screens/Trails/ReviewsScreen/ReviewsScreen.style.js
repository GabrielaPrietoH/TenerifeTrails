import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  reviewItem: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewComment: {
    fontSize: 14,
    marginTop: 8,
  },
  reviewRating: {
    fontSize: 14,
    marginTop: 8,
  },
  reviewDate: {
    fontSize: 12,
    marginTop: 8,
    color: '#888',
  },
});