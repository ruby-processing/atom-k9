attr_reader :pos, :vel, :boundary

# boundary helper
Boundary = Struct.new(:low, :high) do
  def include?(val)
    (low..high).include?(val)
  end
end

RADIUS = 30

def settings
  size 300, 300
end

def setup
  sketch_title 'Atom-K9 Test'
  @boundary = Boundary.new(RADIUS, width - RADIUS)
  @pos = Vec2D.new(
    rand(RADIUS..boundary.high),
    rand(RADIUS..boundary.high)
  )
  @vel = Vec2D.new(
    rand(2.0..3),
    rand(2.0..3)
  )
  puts 'Running Dummy Sketch From Atom'
end

def update
  @pos += vel
  check_boundary
end

def draw
  background 0, 200, 0
  update
  fill 200, 0, 0
  circle(pos.x, pos.y, RADIUS * 2)
end

def check_boundary
  max = boundary.high
  unless boundary.include?(pos.x)
    pos.x = (pos.x > max ? max : RADIUS)
    vel.x *= -1
  end
  return if boundary.include?(pos.y)

  pos.y > max ? max : pos.y = RADIUS
  vel.y *= -1
end
