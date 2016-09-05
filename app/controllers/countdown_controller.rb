class CountdownController < ApplicationController
  def countdown
<%=
    render :partial => 'goals/count-down_portion'
  end
end
