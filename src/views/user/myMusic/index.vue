<template>
  <div id="myMusic">
    <el-tabs type="border-card">
      <el-tab-pane label="音乐（999）">
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
          <div class="type-sort-wrapper" style="margin-left: 680px">
            <span style="color: #8c939d;font-size: 14px">排序：</span>
            <el-button type="text">按最新发布时间</el-button>
            <el-button type="text">按最多访问量</el-button>
          </div>
        </div>
        <!--音乐按类型排序后的内容-->
        <div class="myMusic-bbsMusic" style="overflow:auto;">
          <ul
            class="list"
            v-infinite-scroll="load"
            infinite-scroll-disabled="disabled"
            style="height: 60%;background-color: #222222;">
            <el-table ref="bbsMusicTable"
                      :data="(list||[]).slice(0,pageSize)"
                      :show-header="false"
                      border>
              <div v-if="isEmptyList">
                空空如也
              </div>
              <el-table-column v-else>
                <template #default="scope">
                  <div class="middle-title">
                    <span>{{scope.row.title}}</span>
                  </div>
                  <el-row>
                    <el-col :span="15" style="margin-left: 5px">
                      <!--播放器-->
                      <ql-audio :audioUrl="scope.row.audioUrl"></ql-audio>
                    </el-col>
                    <el-col :span="4" style="padding-top: 40px;">
                      <div class="release-time">
                        {{scope.row.releaseTime | formatTime}}
                      </div>
                    </el-col>
                    <el-col :span="2" style="padding-top: 40px;">
                      <div class="see div-threeIcon">
                        <svg-icon class="threeIcon" icon-class="see"></svg-icon>
                        <span>{{bbsMusic.seeNum}}</span>
                      </div>
                    </el-col>
                  </el-row>
                </template>
              </el-table-column>
            </el-table>
          </ul>
          <div v-if="loading" align="center" style="padding-bottom: 100px">加载中...</div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="资源（888）">
        资源
      </el-tab-pane>
      <el-tab-pane label="问答（777）">
        问答
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import {getMyMusicList} from "@/api/bbsMusic";
  import {mapGetters} from 'vuex'

  const defaultBbsMusic = {
    likeNum: '',
    seeNum: '',
    commentNum: '',
    total: 300
  }

  export default {
    name: "myMusic",
    components: {},
    data() {
      return {
        pageSize: 0,
        loading: false,
        bbsMusic: Object.assign({}, defaultBbsMusic),
        list: [],
        isEmptyList: false,
        voiceValue: 50,
        changeVoiceIcon: 'audio-voice',
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
      myMusicList() {
        getMyMusicList(this.$route.query.id, false).then(response => {
          console.log(response);
          let data = response.data;
          this.list = data
          if (data === null) {
            this.isEmptyList = true
          }
        })
      },
      //当滚动条到达最底端的时候加载新内容
      load() {
        // 滚动条到最顶端的距离
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        // 可视区的高度
        let windowHeight = document.documentElement.clientHeight || document.body.clientHeight
        // 滚动条的总高度
        let scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        // 判断是否到达底部
        if (Math.ceil(scrollTop) + windowHeight == scrollHeight) {
          this.loading = true
          setTimeout(() => {
            this.pageSize += 2
            this.loading = false
          }, 2000)
        }
      },
    },
    filters: {
      formatTime(value) {
        var dateee = new Date(value).toJSON();
        return new Date(+new Date(dateee) + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '')
      }
    },
    created() {
      this.myMusicList()
      if (this.bbsMusic.total < 15)
        this.pageSize = this.bbsMusic.total
      else
        this.pageSize = 15
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
      .list {
        //margin-top: 0px;
        padding-left: 0px;
        box-shadow: 0px -3px 0px 3px #fe0000;

        //.el-table__header-wrapper .el-table__header .has-gutter .el-table_1_column_1.is-leaf .cell {
        //  color: #fe0000;
        //  font-size: 19px;
        //  margin-left: 10px;
        //}
        .el-table-title {
          color: #fe0000;
          font-size: 19px;
          margin-left: 10px;
        }
        .middle-title {
          font-size: 18px;
          color: black;
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }
  }
</style>
