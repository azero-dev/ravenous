const { default: Business } = require("../components/Business/Business");

const apiKey = 'oGAp0_bwuXkHCZST8raYTmgA1vafMvOPzLmQh4WMiBynfkGE_gAeFGRhGtc-97I2V7M8SFl8kS_Tw1k7bJu6Jlpj-vpIab2q6t_fLeKvHoovZDRMBNeLE0JQS8mWX3Yx';

const Yelp = {
    search(term, location, sortBy) {
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
            headers: {
                Authorization: `Bearer ${apiKey}`
            }
        }).then(response => {
            return response.json();
        }).then(jsonResponse => {
            if (jsonResponse.businesses) {
                return jsonResponse.businesses.map(business => ({
                    id: business.id,
                    imageSrc: business.image_url,
                    name: business.name,
                    address: business.location.address1,
                    city: business.location.city,
                    state: business.location.state,
                    zipCode: business.location.zip_code,
                    category: business.categories[0].title,
                    rating: business.rating,
                    reviewCount: business.review_count
                }));
            }
        });
    }
};

export default Yelp;