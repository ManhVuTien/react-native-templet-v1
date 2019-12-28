import * as React from "react"
import {View} from "react-native"
import Config from "react-native-config"
import endpoint from "../../services/request/config/Urls"
import urls from "../../services/request/config/Urls"
import instance from "../../services/request/ApiServices"
import AMList from "../../shared/components/common/AMList"
import AMText from "../../shared/components/common/AMText"
import useInfinityScroll, {Pagination} from "../../shared/hooks/useInfinityScroll"
import i18n from "../../shared/utilities/i18next"
import RequestServices from "../../services/request/ApiServices"

const HomeView = () => {
    const fetchMoreListItems = async (options: Pagination) => {
        const {currentPage, lastIndex, lastItem} = options
        console.log(options)
        try {
            const response = await RequestServices.get(endpoint.LOGIN + "?q=repo:facebook/react+css")
            if (response.data.items) {
                return response.data.items
            }
            return []
        } catch (e) {
            console.log(e)
            return []
        }
    }

    const [loading, data, onLoadMore, onRefresh] = useInfinityScroll(fetchMoreListItems)

    function renderItem({item, index}: any) {
        return <AMText customStyle={{height: 50}} text={item.commit.message}/>
    }

    return (
        <View>
            {/*<AMText text={i18n.t("common.defaultLanguage")} />*/}
            <AMList
                loading={loading}
                data={data}
                renderItem={renderItem}
                refreshing={false}
                onRefresh={onRefresh}
                onLoadMore={onLoadMore}
            />
        </View>
    )
}
export default HomeView
