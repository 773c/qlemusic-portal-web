<template>
  <div id="myMusic">
    <el-tabs type="border-card">
      <el-tab-pane :label="'音乐（'+myMusicQuery.musicNum+'）'">
        <!--按类型排序-->
        <div class="type-sort">
          <!--音量调节-->
          <div class="voice-wrapper">
            <div class="voice-icon-wrapper" @click="voiceHandler">
              <svg-icon class="voice-icon" :icon-class="changeVoiceIcon"></svg-icon>
            </div>
            <div class="voice-progress">
              <el-slider v-model="voiceValue" :show-tooltip="true" @input="changeVolume"></el-slider>
            </div>
          </div>
          <div class="type-sort-wrapper" style="margin-left: 640px">
            <span style="color: #8c939d;font-size: 14px">排序：</span>
            <el-button type="text" @click="getMyMusicListByNewTime" :style="isNewTimeSort===true?{color: '#fe0000'}:''">
              按最新发布时间
            </el-button>
            <el-button type="text" @click="getMyMusicListByMaxPlay"
                       :style="isNewTimeSort===false?{color: '#fe0000'}:''">按最多播放量
            </el-button>
          </div>
        </div>
        <!--音乐按类型排序后的内容-->
        <div class="myMusic-bbsMusic" style="overflow:auto;">
          <el-table ref="bbsMusicTable"
                    :data="list"
                    :show-header="false"
                    border>
            <div v-if="isEmptyList">
              空空如也
            </div>
            <el-table-column v-else>
              <template #default="scope">
                <div class="my-music-title">
                  <span>{{scope.row.title}}</span>
                </div>
                <el-row>
                  <el-col :span="15" style="margin-left: 5px;margin-top: 5px">
                    <!--播放器-->
                    <ql-audio
                      :audioUrl="scope.row.audioUrl"
                      :musicId="0"
                      :audioImgUrl="scope.row.audioAvatarUrl"
                      :isShowLineProgress="false"
                      :prevAudioVueComponent="prevAudioVueComponent"
                      @setPlayEffect="setPlayEffect">
                    </ql-audio>
                  </el-col>
                  <el-col :span="4" style="padding-top: 40px;margin-left: 10px">
                    <div class="my-music-release-time">
                      {{scope.row.releaseTime | formatTime}}
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <div ref="likeRef" class="my-music-like" style="margin-top: 40px">
                      <svg-icon icon-class="like-count" style="color: #bbbbbb;width: 23px"></svg-icon>
                      <span style="color: #bbbbbb;"> {{
                        scope.row.bbsMusicOperation === null
                        ? myMusicQuery.likeCount
                        : scope.row.bbsMusicOperation.likeCount}}
                      </span>
                    </div>
                  </el-col>
                  <el-col :span="2" style="padding-top: 40px;">
                    <div class="my-music-play">
                      <svg-icon icon-class="play-count" style="color: #bbbbbb;width: 22px"></svg-icon>
                      <span style="color: #bbbbbb"> {{
                        scope.row.bbsMusicOperation === null
                        ? myMusicQuery.playCount
                        : scope.row.bbsMusicOperation.playCount}}
                      </span>
                    </div>
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="'资源（'+myMusicQuery.sourceNum+'）'">
        资源
      </el-tab-pane>
      <el-tab-pane :label="'问答（'+myMusicQuery.answerNum+'）'">
        问答
      </el-tab-pane>
      <!--分页-->
      <div class="pagination-wrapper">
        <el-pagination
          @current-change="currentChangeHanlder"
          :hide-on-single-page="true"
          layout="prev,pager,next"
          :total="total">
        </el-pagination>
      </div>
    </el-tabs>
  </div>
</template>

<script>
  import {getMyMusicList} from "@/api/bbsMusic";
  import {mapGetters} from 'vuex'

  const defaultMyMusic = {
    pageNum: 1,
    pageSize: 10,
    likeCount: 0,
    playCount: 0,
    musicNum: 0,
    sourceNum: 0,
    answerNum: 0
  }

  export default {
    name: "myMusic",
    components: {},
    data() {
      return {
        loading: false,
        myMusicQuery: Object.assign({}, defaultMyMusic),
        list: [],
        isEmptyList: false,
        voiceValue: 50,
        changeVoiceIcon: 'audio-voice',
        prevAudioVueComponent: {},
        isNewTimeSort: true,
        total: null,
      }
    },
    computed: {
      volume() {
        return this.voiceValue / 100
      },
      ...mapGetters([
        'userInfo'
      ]),
    },
    methods: {
      changeVolume() {
        this.$qlAudio.volume = this.volume
        localStorage.setItem("volume", this.volume)
      },
      //声音处理
      voiceHandler() {
        let audio = this.$qlAudio
        //muted为true为静音
        if (audio.muted) {
          this.changeVoiceIcon = 'audio-voice'
          audio.muted = false
        } else {
          this.changeVoiceIcon = 'audio-voice-no'
          audio.muted = true
        }
        localStorage.setItem("muted", audio.muted)
      },
      myMusicList(category) {
        getMyMusicList({
          pageNum: this.myMusicQuery.pageNum,
          pageSize: this.myMusicQuery.pageSize,
          userId: this.$route.query.uid,
          category: category
        }, false).then(response => {
          console.log(response);
          let data = response.data;
          this.list = data
          this.total = this.myMusicQuery.musicNum = data.length
          if (data === null) {
            this.isEmptyList = true
          }
          let likeCountSum = 0
          let playCountSum = 0
          let commentCountSum = 0
          data.forEach((item, index) => {
            if (item.bbsMusicOperation.likeCount === null)
              item.bbsMusicOperation.likeCount = 0
            if (item.bbsMusicOperation.playCount === null)
              item.bbsMusicOperation.playCount = 0
            if (item.bbsMusicOperation.commentCount === null)
              item.bbsMusicOperation.commentCount = 0
            likeCountSum += item.bbsMusicOperation.likeCount
            playCountSum += item.bbsMusicOperation.playCount
            commentCountSum += item.bbsMusicOperation.commentCount
          })
          this.$emit('setCount', {
            likeCountSum: likeCountSum,
            playCountSum: playCountSum,
            commentCountSum: commentCountSum
          })
        })
      },
      //按最新发布时间排序
      getMyMusicListByNewTime() {
        this.myMusicList('newTime')
        this.isNewTimeSort = true
      },
      //按最多播放量排序
      getMyMusicListByMaxPlay() {
        this.myMusicList('maxPlay')
        this.isNewTimeSort = false
      },
      currentChangeHanlder(pageNum) {
        this.myMusicQuery.pageNum = pageNum
        let category = ''
        if (this.isNewTimeSort)
          category = 'newTime'
        else
          category = 'maxPlay'
        this.myMusicList(category)
      },
      //获取子组件传来的实例
      setPlayEffect(vueComponent) {
        this.prevAudioVueComponent = vueComponent
      },
    },
    filters: {
      formatTime(value) {
        var dateee = new Date(value).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      }
    },
    created() {
      this.myMusicList(null)
    },
  }
</script>

<style lang="scss" scoped>
  //我的音乐
  #myMusic {
    //音量
    .voice-wrapper {
      width: 15%;
      height: 15px;
      float: left;
      margin-top: 5px;
      margin-left: 30px;

      //音量图标
      .voice-icon-wrapper {
        .voice-icon {
          cursor: pointer;
          width: 1.1em;
          height: 1.1em;
        }
      }
      //音量进度条
      .voice-progress {
        margin: -27px 0 0 25px;
        width: 99%;
        height: 25px;
      }
    }
    .myMusic-bbsMusic {
      .my-music-title {
        span{
          font-size: 20px;
          color: black;
          margin-left: 8px;
          cursor: pointer;
        }
      }
      .my-music-release-time{
      }

    }
    //分页
    .pagination-wrapper {
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
