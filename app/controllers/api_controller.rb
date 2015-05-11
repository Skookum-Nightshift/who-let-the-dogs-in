class ApiController < ApplicationController
  rescue_from ActionController::UnknownFormat, with: :raise_not_found
  after_action :allow_iframe

  def foursquare
    client = Foursquare2::Client.new(client_id: ENV["FOURSQUARE_ID"], client_secret: ENV["FOURSQUARE_SECRET"])
    categories = params[:categorys] || ["4bf58dd8d48988d116941735", "4d4b7105d754a06374d81259", "4bf58dd8d48988d1fa931735", "4bf58dd8d48988d1e5941735"]
    categories = categories.join(",")
    limit = params[:limit] || 20
    results = client.search_venues(ll: params[:ll], query: params[:query], limit: limit, categoryId: categories, v: "20140806", m: "foursquare")

    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.json { render json: results }
    end
  end

  def yelp
    client = Yelp::Client.new({
                            consumer_key: ENV["YELP_CONSUMER_KEY"],
                            consumer_secret: ENV["YELP_CONSUMER_SECRET"],
                            token: ENV["YELP_TOKEN"],
                            token_secret: ENV["YELP_TOKEN_SECRET"]
                          })

    ll = params[:ll].split(",")
    limit = params[:limit] || 20
    categories = params[:categorys] || ["bars", "restaurants", "hotels", "dog_parks"]
    categories = categories.join(",")

    results = client.search_by_coordinates({ latitude: ll[0], longitude: ll[1] }, { term: params[:query], limit: limit, category_filter: categories, sort: 1 }, { lang: 'en' })

    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.json { render json: results }
    end
  end

  def not_found
    respond_to do |format|
      format.html { render file: "#{Rails.root}/public/404", layout: false, status: :not_found }
      format.xml  { head :not_found }
      format.any  { head :not_found }
    end
  end

  def raise_not_found
    render file: "#{Rails.root}/public/404", layout: false, status: :not_found
  end

  private

  def allow_iframe
    response.headers.except! 'X-Frame-Options'
  end
end
