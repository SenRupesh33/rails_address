class Api::V1::AddressbooksController < ApplicationController
  def index
    addressbooks = Addressbook.all.order(created_at: :desc)
    render json: addressbooks
  end

  def create
    addressbooks = Addressbook.create!(addressbook_params)
    if addressbooks
      render json: addressbooks
    else
      render json: addressbooks.errors
    end
  end

  def destroy
    @addressbooks&.destroy
    render json: { message: 'Addressbooks deleted!' }
  end
  
  private

  def addressbook_params
    params.permit(:name, :age, :mobile, :address, :gender)
  end
end
