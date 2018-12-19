// https://www.socketloop.com/tutorials/golang-underscore-or-snake-case-to-camel-case-example
package camel

import "strings"

func Camel(inputUnderScoreStr string) (camelCase string) {
	//snake_case to camelCase

	isToUpper := false

	for _, v := range inputUnderScoreStr {
		if isToUpper {
			camelCase += strings.ToUpper(string(v))
			isToUpper = false
		} else {
			if v == '_' {
				isToUpper = true
			} else {
				camelCase += string(v)
			}
		}
	}
	return

}
