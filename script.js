calc = Calc.getState()
calc.expressions.list = []
Calc.setState(calc)
l = calc.expressions
xhr = new XMLHttpRequest();

// This function will be run once you send the Http Request
xhr.onload = () => {
    res = JSON.parse(xhr.response);
    console.log(res)

    width = res.width
    height = res.height
    colors_list = res.colors_list

    calc = Calc.getState()
    calc.expressions.list = []
    l = calc.expressions

    for (i = 0; i < width; i++) {
      for (j = 0; j < height; j++) {
        r = colors_list[j * width + i]['r']
        g = colors_list[j * width + i]['g']
        b = colors_list[j * width + i]['b']

        color = {
          "type": "expression",
          "id": "1",
          "color": "#c74440",
          "latex": `C_{${i}x${j}}=\\operatorname{rgb}\\left(${r},\\ ${g},\\ ${b}\\right)`
        }
        polygon = {
          "type": "expression",
          "id": "2",
          "color": "#2d70b3",
          "latex": `\\operatorname{polygon}\\left(\\left(${i},${(-1 * j)}\\right),\\left(${i},${(-1 * j)-1}\\right),\\left(${i+1},${(-1 * j)-1}\\right),\\left(${i+1},${(-1 * j)}\\right)\\right)`,
          "colorLatex": `C_{${i}x${j}}`,
          "fillOpacity": "1",
          "lineOpacity": "1",
          "lineWidth": "0"
        }

        l.list = l.list.concat(color)
        l.list = l.list.concat(polygon)
      }
    }
    console.log(l.list.length)
    Calc.setState(calc)
    console.log("Done")
}

xhr.open('GET', 'http://127.0.0.1:5000/')
xhr.send();
