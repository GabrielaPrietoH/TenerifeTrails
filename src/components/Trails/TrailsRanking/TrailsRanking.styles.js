import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  content: {
    backgroundColor: "#fff",
    marginVertical: 10,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  infoContent: {
    paddingHorizontal: 20,
    paddingTop: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  nameContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  medal: {
    marginRight: 5,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    flexShrink: 1,
  },
  description: {
    color: "#828282",
    fontSize: 12,
    paddingHorizontal: 20,
    paddingBottom: 15,
    paddingTop: 10,
  },
  reviewsList: {
    marginTop: 10,
    paddingHorizontal: 20,
  },
  reviewItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  reviewComment: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
    lineHeight: 20,
  },
  reviewRating: {
    fontSize: 14,
    color: "#888",
    marginTop: 5,
  },
  reviewDate: {
    fontSize: 12,
    color: "#aaa",
    marginTop: 5,
    fontStyle: "italic",
  },
  noReviewsText: {
    textAlign: "center",
    color: "#888",
    marginVertical: 10,
    fontStyle: "italic",
  },
  seeAllReviews: {
    textAlign: "center",
    color: "#007BFF", 
    fontSize: 14, 
    fontWeight: "bold",
    marginBottom: 10,
  },
  lastReviewContainer: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
});