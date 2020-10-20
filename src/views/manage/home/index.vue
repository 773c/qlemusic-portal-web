<template>
  <div id="manage-home">
    <div class="home-user-info-wrapper">
      <div class="hui-avatar-wrapper">
        <el-avatar :size=70 :src="userInfo.headIcon"></el-avatar>
      </div>
      <div class="hui-name-wrapper">
        {{userInfo.name}}
      </div>
      <div style="clear: both;"></div>
      <div class="hui-authentication-wrapper">
        <el-divider content-position="left">
          <div class="hui-authentication-title">
            <span>发布代表作 <i class="el-icon-position"></i></span>
          </div>
        </el-divider>
        <div class="huia-card-wrapper">
          <el-card class="huia-card" shadow="never">
            <div class="huia-card-content-wrapper">
              <div class="huia-tip-wrapper">
                <div class="huia-tip-one">暂未认证音乐人身份</div>
                <div class="huia-tip-two">可以以演唱者、作词或作曲的身份进行认证，认证后即可享受以下福利</div>
              </div>
              <div class="huia-welface-wrapper">
                <div class="huia-welface-one">
                  <img src="@/assets/images/release-exposure.png" width="70" height="70">
                  <div class="huia-welface-text">丰富的曝光资源</div>
                </div>
                <div class="huia-welface-two">
                  <img src="@/assets/images/release-manage.png" width="70" height="70">
                  <div class="huia-welface-text">完善的作品发布管理</div>
                </div>
                <div class="huia-welface-three">
                  <img src="@/assets/images/release-money.png" width="70" height="70">
                  <div class="huia-welface-text">丰富的变现形式</div>
                </div>
              </div>
              <div style="clear: both;"></div>
              <div class="huia-button-wrapper">
                <el-button class="huia-button">立即认证</el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>
    <div style="clear: both;"></div>
    <div class="home-data-info-wrapper">
      <el-card class="hdi-card" shadow="never">
        <div slot="header" class="hdi-card-header-wrapper">
          <span>数据概览</span>
          <el-button style="float: right; padding: 3px 0" type="text">数据详情<i class="el-icon-arrow-right"></i>
          </el-button>
        </div>
        <div class="hdi-card-content-wrapper">
          <div class="hdi-newaddplay-wrapper">
            <div class="hdi-newaddplay-title">
              昨日新增播放量
            </div>
            <div class="hdi-newaddplay-count">
              ━
            </div>
          </div>
          <div class="hdi-newaddlike-wrapper">
            <div class="hdi-newaddlike-title">
              昨日新增点赞
            </div>
            <div class="hdi-newaddlike-count">
              ━
            </div>
          </div>
          <div class="hdi-newaddcomment-wrapper">
            <div class="hdi-newaddcomment-title">
              昨日新增评论
            </div>
            <div class="hdi-newaddcomment-count">
              ━
            </div>
          </div>
          <div class="hdi-newaddcollect-wrapper">
            <div class="hdi-newaddcollect-title">
              昨日新增收藏
            </div>
            <div class="hdi-newaddcollect-count">
              ━
            </div>
          </div>
          <div class="hdi-newaddfan-wrapper">
            <div class="hdi-newaddfan-title">
              昨日新增粉丝
            </div>
            <div class="hdi-newaddfan-count">
              ━
            </div>
          </div>
          <div class="hdi-cancel-attention-wrapper">
            <div class="hdi-cancel-attention-title">
              昨日取消关注
            </div>
            <div class="hdi-cancel-attention-count">
              ━
            </div>
          </div>
        </div>
      </el-card>
    </div>
    <div style="clear: both;"></div>
    <div class="home-recently-music-wrapper">
      <el-card class="hrm-card" shadow="never">
        <div slot="header" class="hrm-card-header-wrapper">
          <span>近期发布的歌曲</span>
          <el-button style="float: right; padding: 3px 0" type="text">更多<i class="el-icon-arrow-right"></i></el-button>
        </div>
        <div class="hrm-card-content-wrapper">
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
                    <ql-audio
                      :audioUrl="scope.row.audioUrl"
                      :startTime="scope.row.startTime"
                      :playTime="scope.row.playTime"
                      :audioImgUrl="scope.row.audioAvatarUrl"
                      :isShowLineProgress="false">
                    </ql-audio>
                  </el-col>
                  <el-col :span="4" style="padding-top: 40px;">
                  </el-col>
                  <el-col :span="2" style="padding-top: 40px;">
                  </el-col>
                </el-row>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  const defaultBbsMusic = {
    playCount: '',
    total: 300
  }

  export default {
    name: "manageHome",
    data() {
      return {
        list: [],
        isEmptyList: false,
        pageSize: 0,
        bbsMusic: Object.assign({}, defaultBbsMusic)
      }
    },
    computed: {
      ...mapGetters([
        'userInfo'
      ])
    },
    methods: {},
    created() {
      if (this.bbsMusic.total < 15)
        this.pageSize = this.bbsMusic.total
      else
        this.pageSize = 15
    }
  }
</script>

<style lang="scss" scoped>
  #manage-home {
    padding: 5px 20px;
    //头像用户信息
    .home-user-info-wrapper {
      .hui-avatar-wrapper {
        float: left;
      }
      .hui-name-wrapper {
        margin-left: 100px;
        padding-top: 6px;
      }
      .hui-authentication-wrapper {
        margin-top: 39px;
        .hui-authentication-title {
          width: 150px;
          height: 30px;
          line-height: 31px;
          text-align: center;
          background-color: #333333;
          span {
            color: white;
          }
        }
        .huia-card-wrapper {
          margin-top: 29px;
          .huia-card {
            .huia-card-content-wrapper {
              text-align: center;
              .huia-tip-wrapper {
                margin-top: 10px;
                .huia-tip-one {
                  font-size: 18px;
                }
                .huia-tip-two {
                  margin-top: 12px;
                  font-size: 14px;
                  color: #888888;
                }
              }
              .huia-welface-wrapper {
                margin-top: 50px;
                .huia-welface-text {
                  margin-top: 16px;
                }
                .huia-welface-one {
                  float: left;
                  margin-left: 100px;
                }
                .huia-welface-two {
                  float: left;
                  margin-left: 125px;
                }
                .huia-welface-three {
                  float: left;
                  margin-left: 125px;
                }
              }
              .huia-button-wrapper {
                margin-top: 50px;
                margin-bottom: 10px;
                .huia-button {
                  padding: 15px 50px;
                  background-color: #333333;
                  color: white;
                  border-radius: 50px;
                }
              }
            }
          }
        }
      }
    }
    //数据概述
    .home-data-info-wrapper {
      margin-top: 25px;
      .hdi-card {
        .hdi-card-header-wrapper {
          span {
            font-size: 18px;
          }
        }
        .hdi-card-content-wrapper {
          margin-top: 10px;
          height: 80px;
          .hdi-newaddplay-wrapper {
            float: left;
            .hdi-newaddplay-title {

            }
            .hdi-newaddplay-count {
              margin-top: 28px;
              text-align: center;
              font-weight: bolder;
            }
          }
          .hdi-newaddlike-wrapper {
            float: left;
            margin-left: 43px;
            .hdi-newaddlike-title {

            }
            .hdi-newaddlike-count {
              margin-top: 28px;
              text-align: center;
              font-weight: bolder;
            }
          }
          .hdi-newaddcomment-wrapper {
            float: left;
            margin-left: 43px;
            .hdi-newaddcomment-title {

            }
            .hdi-newaddcomment-count {
              margin-top: 28px;
              text-align: center;
              font-weight: bolder;
            }
          }
          .hdi-newaddcollect-wrapper {
            float: left;
            margin-left: 43px;
            .hdi-newaddcollect-title {

            }
            .hdi-newaddcollect-count {
              margin-top: 28px;
              text-align: center;
              font-weight: bolder;
            }
          }
          .hdi-newaddfan-wrapper {
            float: left;
            margin-left: 43px;
            .hdi-newaddfan-title {

            }
            .hdi-newaddfan-count {
              margin-top: 28px;
              text-align: center;
              font-weight: bolder;
            }
          }
          .hdi-cancel-attention-wrapper {
            float: left;
            margin-left: 43px;
            .hdi-cancel-attention-title {

            }
            .hdi-cancel-attention-count {
              margin-top: 28px;
              text-align: center;
              font-weight: bolder;
            }
          }
        }
      }
    }
    //近期发布的歌曲
    .home-recently-music-wrapper {
      margin-top: 25px;
      .hrm-card {
        .hrm-card-header-wrapper {
          span {
            font-size: 18px;
          }
        }
      }
    }
  }
</style>
